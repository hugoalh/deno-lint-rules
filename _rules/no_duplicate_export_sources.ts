import {
	Grouper,
	listFormatterConjunction,
	NodeSerializer,
	NodeVisualPosition,
	type RuleConstructContext
} from "../_utility.ts";
const serializer: NodeSerializer = new NodeSerializer();
export default {
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
						const grouper: Grouper<Deno.lint.ExportNamedDeclaration> = new Grouper<Deno.lint.ExportNamedDeclaration>();
						for (const statement of node.body) {
							if (statement.type === "ExportNamedDeclaration" && statement.source !== null) {
								grouper.add(statement, serializer.forSource(statement.source, statement.attributes));
							}
						}
						for (const exportsNamed of grouper.values()) {
							if (exportsNamed.length > 1) {
								const exportsPosition: readonly string[] = exportsNamed.map((node: Deno.lint.ExportNamedDeclaration): string => {
									return new NodeVisualPosition(context, node).toString();
								});
								for (let index: number = 0; index < exportsNamed.length; index += 1) {
									context.report({
										node: exportsNamed[index],
										message: `Found multiple export named declarations with same source, possibly mergeable.`,
										hint: `Other export named declarations with same source locate at position ${listFormatterConjunction.format(exportsPosition.toSpliced(index, 1))}.`
									});
								}
							}
						}
					}
				};
			}
		};
	}
} satisfies RuleConstructContext as RuleConstructContext;
