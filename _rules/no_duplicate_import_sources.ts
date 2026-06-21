import {
	Grouper,
	isNodeStringLiteral,
	listFormatterConjunction,
	NodeSerializer,
	NodeVisualPosition,
	type RuleConstructContext
} from "../_utility.ts";
const serializer: NodeSerializer = new NodeSerializer();
export default {
	identifier: "no-duplicate-import-sources",
	tags: [
		"recommended",
		"simplify"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				const grouper: Grouper<Deno.lint.ImportDeclaration | Deno.lint.ImportExpression> = new Grouper<Deno.lint.ImportDeclaration | Deno.lint.ImportExpression>();
				return {
					ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
						// Collect and check at later.
						grouper.add(node, serializer.forSource(node.source, node.attributes));
					},
					ImportExpression(node: Deno.lint.ImportExpression): void {
						// Collect and check at later.
						if (isNodeStringLiteral(node.source) && node.options === null) {
							grouper.add(node, serializer.forSource(node.source, []));
						}
					},
					"Program:exit"(): void {
						// Check whether the source is exist in dynamic imports and static imports.
						for (const imports of grouper.values()) {
							const importsDynamic: readonly Deno.lint.ImportExpression[] = imports.filter((node: Deno.lint.ImportDeclaration | Deno.lint.ImportExpression): node is Deno.lint.ImportExpression => {
								return (node.type === "ImportExpression");
							});
							const importsStatic: readonly Deno.lint.ImportDeclaration[] = imports.filter((node: Deno.lint.ImportDeclaration | Deno.lint.ImportExpression): node is Deno.lint.ImportDeclaration => {
								return (node.type === "ImportDeclaration");
							});
							if (importsStatic.length > 0) {
								const importsPosition: readonly string[] = importsStatic.map((node: Deno.lint.ImportDeclaration): string => {
									return new NodeVisualPosition(context, node).toString();
								});
								for (const importDynamic of importsDynamic) {
									context.report({
										node: importDynamic,
										message: `Found import declaration(s) with same source, possibly mergeable.`,
										hint: `Import declarations with same source locate at position ${listFormatterConjunction.format(importsPosition)}.`
									});
								}
								if (importsStatic.length > 1) {
									for (let index: number = 0; index < importsStatic.length; index += 1) {
										context.report({
											node: importsStatic[index],
											message: `Found multiple import declarations with same source, possibly mergeable.`,
											hint: `Other import declarations with same source locate at position ${listFormatterConjunction.format(importsPosition.toSpliced(index, 1))}.`
										});
									}
								}
							}
						}
					}
				};
			}
		};
	}
} satisfies RuleConstructContext as RuleConstructContext;
