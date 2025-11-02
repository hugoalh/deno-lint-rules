import {
	getNodeCommentsFromRange,
	getVisualPositionStringFromNode,
	NodeSerializer,
	type RuleData
} from "../_utility.ts";
const serializer: NodeSerializer = new NodeSerializer({ typescript: false });
export const ruleData: RuleData = {
	identifier: "unique-array",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ArrayExpression(node: Deno.lint.ArrayExpression): void {
						const comments: readonly (Deno.lint.BlockComment | Deno.lint.LineComment)[] = context.sourceCode.getCommentsBefore(node);
						if (comments.length > 0) {
							const comment: Deno.lint.BlockComment | Deno.lint.LineComment = comments[comments.length - 1];
							const commentRaw: string = comment.value.trim();
							if (comment.type === "Block" && (
								commentRaw === "UNIQUE" ||
								commentRaw === "Unique" ||
								commentRaw === "unique"
							)) {
								const elementsSerialize: readonly string[] = node.elements.map((element: Deno.lint.Expression | Deno.lint.SpreadElement): string => {
									return serializer.for(element);
								});
								const elementsPosition: readonly string[] = node.elements.map((element: Deno.lint.Expression | Deno.lint.SpreadElement): string => {
									return getVisualPositionStringFromNode(context, element);
								});
								for (let index: number = 1; index < node.elements.length; index += 1) {// Index 0 is always unique.
									const current: Deno.lint.Expression | Deno.lint.SpreadElement = node.elements[index];
									const elementsIndexDuplicated: number = elementsSerialize.slice(0, index).indexOf(elementsSerialize[index]);
									if (elementsIndexDuplicated !== -1) {
										const report: Deno.lint.ReportData = {
											node: current,
											message: `The element is not unique in the array.`,
											hint: `The first position with same element: ${elementsPosition[elementsIndexDuplicated]}`
										};
										const previous: Deno.lint.Expression | Deno.lint.SpreadElement = node.elements[index - 1];
										const fixerRangeArraySplitter: Deno.lint.Range = [previous.range[1], current.range[0]];
										if (getNodeCommentsFromRange(context, fixerRangeArraySplitter).length === 0) {
											const indexInRangeArraySplitter: number = context.sourceCode.text.slice(...fixerRangeArraySplitter).indexOf(",");
											if (indexInRangeArraySplitter !== -1) {
												const indexOperatorInContext: number = fixerRangeArraySplitter[0] + indexInRangeArraySplitter;
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
					}
				};
			}
		};
	}
};
