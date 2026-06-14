import {
	areNodesSame,
	Grouper,
	type RuleConstructContext
} from "../_utility.ts";
type NodeDepend =
	| Deno.lint.ExportAllDeclaration
	| Deno.lint.ExportNamedDeclaration
	| Deno.lint.ImportDeclaration;
const sorter: Intl.Collator = new Intl.Collator(undefined, {
	caseFirst: "false",
	collation: "default",
	ignorePunctuation: false,
	localeMatcher: "best fit",
	numeric: true,
	sensitivity: "accent",
	usage: "sort"
});
export type RuleSortDependsDependType =
	| "blob"
	| "bun"
	| "data"
	| "file"
	| "http"
	| "https"
	| "jsr"
	| "local-absolute"
	| "local-relative"
	| "local"
	| "node"
	| "npm"
	| "other"
	| "protocol"
	| "unknown";
export type RuleSortDependsSortOrder =
	| "ascending"
	| "descending"
	| "keep";
export interface RuleSortDependsMapContext {
	/**
	 * Type of the depend.
	 */
	type: RuleSortDependsDependType;
	/**
	 * Order of the depend.
	 * 
	 * Default value is inherit from {@linkcode RuleSortDependsOptions.mapOrderDefault}.
	 */
	order?: RuleSortDependsSortOrder;
}
export interface RuleSortDependsOptions {
	/**
	 * Whether the `export` statements should locate before the `import` statements.
	 * @default {false}
	 */
	exportFirst?: boolean;
	/**
	 * Whether to ignore `export` statements, and only sort `import` statements.
	 * @default {false}
	 */
	ignoreExport?: boolean;
	/**
	 * Map of the depend type order.
	 * @default {[ "unknown", "protocol", "local", "other" ]}
	 */
	map?: readonly (RuleSortDependsDependType | RuleSortDependsMapContext)[];
	/**
	 * Default sort order of the depend type order map.
	 * 
	 * This property may inherit by {@linkcode RuleSortDependsMapContext.order}.
	 * @default {"ascending"}
	 */
	mapOrderDefault?: RuleSortDependsSortOrder;
	/**
	 * Whether to mix sort `export` statements and `import` statements together.
	 * @default {false}
	 */
	mix?: boolean;
	/**
	 * Whether to reverse the order.
	 * @default {false}
	 */
	reverse?: boolean;
}
interface RuleSortDependsSorterPayload extends Required<Omit<RuleSortDependsOptions, "mapOrderDefault">> {
	map: readonly Required<RuleSortDependsMapContext>[];
}
function sortDependsGroup(payload: RuleSortDependsSorterPayload, nodes: readonly NodeDepend[]): readonly NodeDepend[] {
	const {
		exportFirst,
		map,
		mix,
		reverse
	}: RuleSortDependsSorterPayload = payload;
	const grouper: Grouper<NodeDepend, RuleSortDependsDependType> = new Grouper<NodeDepend, RuleSortDependsDependType>([...map.map(({ type }: RuleSortDependsMapContext): RuleSortDependsDependType => {
		return type;
	}), "other"]);
	for (const node of nodes) {
		const source: string = node.source!.value;
		if (source.startsWith("/")) {
			grouper.add(node, "local-absolute", "local", "other");
		} else if (
			source.startsWith("./") ||
			source.startsWith("../")
		) {
			grouper.add(node, "local-relative", "local", "other");
		} else if (source.startsWith("blob:")) {
			grouper.add(node, "blob", "protocol", "other");
		} else if (source.startsWith("bun:")) {
			grouper.add(node, "bun", "protocol", "other");
		} else if (source.startsWith("data:")) {
			grouper.add(node, "data", "protocol", "other");
		} else if (source.startsWith("file:")) {
			grouper.add(node, "file", "protocol", "other");
		} else if (source.startsWith("http:")) {
			grouper.add(node, "http", "protocol", "other");
		} else if (source.startsWith("https:")) {
			grouper.add(node, "https", "protocol", "other");
		} else if (source.startsWith("jsr:")) {
			grouper.add(node, "jsr", "protocol", "other");
		} else if (source.startsWith("node:")) {
			grouper.add(node, "node", "protocol", "other");
		} else if (source.startsWith("npm:")) {
			grouper.add(node, "npm", "protocol", "other");
		} else {
			grouper.add(node, "unknown", "other");
		}
	}
	const typedFlat: readonly NodeDepend[] = grouper.entries().map(([
		type,
		values
	]: [RuleSortDependsDependType, NodeDepend[]]): NodeDepend[] => {
		const { order }: Required<RuleSortDependsMapContext> = map.find((element: Required<RuleSortDependsMapContext>): boolean => {
			return (element.type === type);
		})!;
		if (order === "keep") {
			return values;
		}
		const valuesSorted: NodeDepend[] = values.toSorted((a: NodeDepend, b: NodeDepend): number => {
			const result: number = sorter.compare(a.source!.value, b.source!.value);
			if (result !== 0) {
				return result;
			}
			if (a.type === "ImportDeclaration" && b.type !== "ImportDeclaration") {
				return (exportFirst ? 1 : -1);
			}
			if (a.type !== "ImportDeclaration" && b.type === "ImportDeclaration") {
				return (exportFirst ? -1 : 1);
			}
			return 0;
		});
		return ((order === "ascending") ? valuesSorted : valuesSorted.toReversed());
	}).flat();
	if (mix) {
		return (reverse ? typedFlat.toReversed() : typedFlat);
	}
	const typedFlatExports: readonly NodeDepend[] = typedFlat.filter(({ type }: NodeDepend): boolean => {
		return (type !== "ImportDeclaration");
	});
	const typedFlatImports: readonly NodeDepend[] = typedFlat.filter(({ type }: NodeDepend): boolean => {
		return (type === "ImportDeclaration");
	});
	const typedFlatSorted: readonly NodeDepend[] = exportFirst ? [...typedFlatExports, ...typedFlatImports] : [...typedFlatImports, ...typedFlatExports];
	return (reverse ? typedFlatSorted.toReversed() : typedFlatSorted);
}
function* splitDependsGroup(payload: RuleSortDependsSorterPayload, node: Deno.lint.Program): Generator<readonly NodeDepend[]> {
	const { ignoreExport }: RuleSortDependsSorterPayload = payload;
	let result: NodeDepend[] = [];
	for (const statement of node.body) {
		if (
			(!ignoreExport && statement.type === "ExportAllDeclaration") ||
			(!ignoreExport && statement.type === "ExportNamedDeclaration" && statement.source !== null) ||
			statement.type === "ImportDeclaration"
		) {
			result.push(statement);
			continue;
		}
		if (result.length > 0) {
			yield result;
			result = [];
		}
	}
	if (result.length > 0) {
		yield result;
	}
}
export default {
	identifier: "sort-depends",
	querier(payload: unknown = {}): Deno.lint.Rule {
		const {
			exportFirst = false,
			ignoreExport = false,
			map = /* UNIQUE */[
				"unknown",
				"protocol",
				"local",
				"other"
			],
			mapOrderDefault = "ascending",
			mix = false,
			reverse = false
		}: RuleSortDependsOptions = payload as RuleSortDependsOptions;
		const payloadFmt: RuleSortDependsSorterPayload = {
			exportFirst,
			ignoreExport,
			map: map.map((value: RuleSortDependsDependType | RuleSortDependsMapContext): Required<RuleSortDependsMapContext> => {
				if (typeof value === "string") {
					return {
						type: value,
						order: mapOrderDefault
					};
				}
				return {
					type: value.type,
					order: value.order ?? mapOrderDefault
				};
			}),
			mix,
			reverse
		};
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Program(node: Deno.lint.Program): void {
						let groupNumber: number = 1;
						for (const dependNodes of splitDependsGroup(payloadFmt, node)) {
							const dependNodesSorted: readonly NodeDepend[] = sortDependsGroup(payloadFmt, dependNodes);
							for (let index = 0; index < dependNodes.length; index += 1) {
								const dependNode: NodeDepend = dependNodes[index];
								const indexExpect: number = dependNodesSorted.findIndex((dependNodeFmt: NodeDepend): boolean => {
									return areNodesSame(dependNodeFmt, dependNode);
								});
								if (index !== indexExpect) {
									context.report({
										node: dependNode,
										message: `This depend statement is not at the expected position; Expect: ${groupNumber}#${indexExpect + 1}, Current: ${groupNumber}#${index + 1}.`
									});
								}
							}
							groupNumber += 1;
						}
					}
				};
			}
		};
	}
} satisfies RuleConstructContext;
