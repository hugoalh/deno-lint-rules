import {
	Grouper,
	isNodeStringLiteral,
	listFormatterConjunction,
	NodeSerializer,
	NodeVisualPosition,
	partition,
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
							const [
								importsDynamic,
								importsStatic
							]: [readonly Deno.lint.ImportExpression[], readonly Deno.lint.ImportDeclaration[]] = partition(imports, (node: Deno.lint.ImportDeclaration | Deno.lint.ImportExpression): node is Deno.lint.ImportExpression => {
								return (node.type === "ImportExpression");
							});
							const importsStaticPosition: readonly string[] = (// Get visual position on demand to reduce workload.
								importsDynamic.length > 0 ||
								importsStatic.length > 1
							) ? importsStatic.map((node: Deno.lint.ImportDeclaration): string => {
								return new NodeVisualPosition(context, node).toString();
							}) : [];
							if (importsDynamic.length > 0 && importsStatic.length > 0) {
								const importsStaticPositionHint: string = `Import declarations with same source locate at position ${listFormatterConjunction.format(importsStaticPosition)}.`;
								for (const importDynamic of importsDynamic) {
									context.report({
										node: importDynamic,
										message: `Found import declaration(s) with same source, possibly mergeable.`,
										hint: importsStaticPositionHint
									});
								}
							}
							if (importsStatic.length > 1) {
								const fixerDispatch: boolean = importsStatic.every((node: Deno.lint.ImportDeclaration): boolean => {
									return (context.sourceCode.getCommentsInside(node).length === 0 && node.importKind === "value");
								});
								for (let index: number = 0; index < importsStatic.length; index += 1) {
									const report: Deno.lint.ReportData = {
										node: importsStatic[index],
										message: `Found multiple import declarations with same source, possibly mergeable.`,
										hint: `Other import declarations with same source locate at position ${listFormatterConjunction.format(importsStaticPosition.toSpliced(index, 1))}.`
									};
									if (index === 0 && fixerDispatch) {
										const [
											importStaticRemain,
											...importsStaticRemove
										]: readonly Deno.lint.ImportDeclaration[] = importsStatic;
										const replacementText: string = importsStaticRemove.map((node: Deno.lint.ImportDeclaration): string => {
											const raw: string = context.sourceCode.getText(node);
											return raw.slice(raw.indexOf("{") + 1, raw.indexOf("}"));
										}).join(",");
										report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
											return [
												...importsStaticRemove.map((node: Deno.lint.ImportDeclaration): Deno.lint.Fix => {
													return fixer.remove(node);
												}).reverse(),
												fixer.insertTextAfterRange([importStaticRemain.range[0], importStaticRemain.range[0] + context.sourceCode.getText(importStaticRemain).indexOf("}")], `,${replacementText}`)
											];
										};
									}
									context.report(report);
								}
							}
						}
					}
				};
			}
		};
	}
} satisfies RuleConstructContext as RuleConstructContext;
