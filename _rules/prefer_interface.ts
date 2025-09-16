import {
	getNodeCommentsFromRange,
	type RuleData
} from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "prefer-interface",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					TSTypeAliasDeclaration(node: Deno.lint.TSTypeAliasDeclaration): void {
						if (node.typeAnnotation.type === "TSTypeLiteral") {
							const report: Deno.lint.ReportData = {
								node,
								message: `Prefer to use \`interface\` instead of \`type\`.`
							};
							const fixerRangeAssignSplitter: Deno.lint.Range = [Math.max(node.id.range[1], node.typeParameters?.range[1] ?? 0), node.typeAnnotation.range[0]];
							const fixerModeDeclare: boolean = node.declare && context.sourceCode.getText(node).startsWith("declare type");
							if ((
								!node.declare ||
								fixerModeDeclare
							) && getNodeCommentsFromRange(context, fixerRangeAssignSplitter).length === 0) {
								const indexInRangeAssignSplitter: number = context.sourceCode.text.slice(...fixerRangeAssignSplitter).indexOf("=");
								if (indexInRangeAssignSplitter !== -1) {
									const indexInContext: number = fixerRangeAssignSplitter[0] + indexInRangeAssignSplitter;
									report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
										const result: Deno.lint.Fix[] = [];
										if (context.sourceCode.getText(node).endsWith(";")) {
											result.push(fixer.removeRange([node.range[1] - 1, node.range[1]]));
										}
										result.push(
											fixer.removeRange([indexInContext, indexInContext + 1]),
											fixer.replaceTextRange(fixerModeDeclare ? [node.range[0] + 8, node.range[0] + 8 + 4] : [node.range[0], node.range[0] + 4], "interface")
										);
										return result;
									};
								}
							}
							context.report(report);
						}
					}
				};
			}
		};
	}
};
