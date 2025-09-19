import {
	getVisualPositionStringFromNode,
	IdenticalGrouper,
	NodeSerializer,
	type RuleData
} from "../_utility.ts";
const serializer: NodeSerializer = new NodeSerializer();
export const ruleData: RuleData = {
	identifier: "no-duplicate-export-sources",
	tags: [
		"recommended",
		"simplify"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Program(node: Deno.lint.Program): void {
						const grouperByExportNamedSource: IdenticalGrouper<Deno.lint.ExportNamedDeclaration> = new IdenticalGrouper<Deno.lint.ExportNamedDeclaration>();
						for (const statement of node.body) {
							if (statement.type === "ExportNamedDeclaration" && statement.source !== null) {
								grouperByExportNamedSource.add(serializer.forSource(statement.source, statement.attributes), statement);
							}
						}
						for (const exportsNamed of grouperByExportNamedSource.values()) {
							if (exportsNamed.length > 1) {
								const exportsNamedMeta: readonly string[] = exportsNamed.map((node: Deno.lint.ExportNamedDeclaration): string => {
									return `- ${getVisualPositionStringFromNode(context, node)}`;
								});
								for (let index: number = 0; index < exportsNamed.length; index += 1) {
									context.report({
										node: exportsNamed[index],
										message: `Found multiple export named declarations with same source, possibly mergeable.`,
										hint: `Other export named declarations with same source:\n${exportsNamedMeta.toSpliced(index, 1).join("\n")}`
									});
								}
							}
						}
					}
				};
			}
		};
	}
};
