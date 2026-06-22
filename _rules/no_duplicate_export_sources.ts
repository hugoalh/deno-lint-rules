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
								const fixerDispatch: boolean = exportsNamed.every((node: Deno.lint.ExportNamedDeclaration): boolean => {
									return (context.sourceCode.getCommentsInside(node).length === 0 && node.exportKind === "value");
								});
								for (let index: number = 0; index < exportsNamed.length; index += 1) {
									const report: Deno.lint.ReportData = {
										node: exportsNamed[index],
										message: `Found multiple export named declarations with same source, possibly mergeable.`,
										hint: `Other export named declarations with same source locate at position ${listFormatterConjunction.format(exportsPosition.toSpliced(index, 1))}.`
									};
									if (index === 0 && fixerDispatch) {
										const [
											exportNamedRemain,
											...exportsNamedRemove
										]: Deno.lint.ExportNamedDeclaration[] = exportsNamed;
										const replacementText: string = exportsNamedRemove.map((node: Deno.lint.ExportNamedDeclaration): string => {
											const raw: string = context.sourceCode.getText(node);
											return raw.slice(raw.indexOf("{") + 1, raw.indexOf("}"));
										}).join(",");
										report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
											return [
												...exportsNamedRemove.map((node: Deno.lint.ExportNamedDeclaration): Deno.lint.Fix => {
													return fixer.remove(node);
												}).reverse(),
												fixer.insertTextAfterRange([exportNamedRemain.range[0], exportNamedRemain.range[0] + context.sourceCode.getText(exportNamedRemain).indexOf("}")], `,${replacementText}`)
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
