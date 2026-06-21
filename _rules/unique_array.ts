import {
	getNodeCommentsFromRange,
	NodeSerializer,
	NodeVisualPosition,
	type NodeComment,
	type RuleConstructContext
} from "../_utility.ts";
const serializer: NodeSerializer = new NodeSerializer();
export default {
	identifier: "unique-array",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ArrayExpression(node: Deno.lint.ArrayExpression): void {
						if (node.elements.length > 1 && node.elements.every((element: Deno.lint.Expression | Deno.lint.SpreadElement): boolean => {
							return (element !== null);
						}) && getNodeCommentsFromRange(context, [node.range[0] + 1, node.elements[0].range[0]]).some((comment: NodeComment): boolean => {
							const commentValue: string = comment.value.trim();
							return (
								commentValue === "UNIQUE" ||
								commentValue === "Unique" ||
								commentValue === "unique"
							);
						})) {
							const elementsSerialize: readonly string[] = node.elements.map((element: Deno.lint.Expression | Deno.lint.SpreadElement): string => {
								return serializer.for(element);
							});
							const elementsPosition: readonly string[] = node.elements.map((element: Deno.lint.Expression | Deno.lint.SpreadElement): string => {
								return new NodeVisualPosition(context, element).toString();
							});
							for (let index: number = 1; index < node.elements.length; index += 1) {// Index 0 is always unique.
								const current: Deno.lint.Expression | Deno.lint.SpreadElement = node.elements[index];
								const elementsIndexDuplicated: number = elementsSerialize.slice(0, index).indexOf(elementsSerialize[index]);
								if (elementsIndexDuplicated !== -1) {
									const report: Deno.lint.ReportData = {
										node: current,
										message: `The element is not unique in the array.`,
										hint: `The first same element at index #${elementsIndexDuplicated} with position "${elementsPosition[elementsIndexDuplicated]}".`
									};
									const fixerRange: Deno.lint.Range = [node.elements[index - 1].range[1], current.range[0]];
									if (getNodeCommentsFromRange(context, fixerRange).length === 0) {
										const indexArraySplitter: number = context.sourceCode.text.slice(...fixerRange).indexOf(",");
										if (indexArraySplitter !== -1) {
											const indexOperatorInContext: number = fixerRange[0] + indexArraySplitter;
											report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
												return [
													fixer.remove(current),
													fixer.removeRange([indexOperatorInContext, indexOperatorInContext + 1])
												];
											};
										}
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
