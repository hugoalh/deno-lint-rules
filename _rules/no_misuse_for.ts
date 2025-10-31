import {
	getNodeCommentsFromRange,
	type RuleData
} from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "no-misuse-for",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ForStatement(node: Deno.lint.ForStatement): void {
						if (node.init === null && node.update === null) {
							const report: Deno.lint.ReportData = {
								node,
								message: `\`for\` statement without initializer statement and update statement is possibly replaceable by the \`while\` statement.`
							};
							const rangeForHeader: Deno.lint.Range = [node.range[0], node.body.range[0]];
							if (getNodeCommentsFromRange(context, rangeForHeader).length === 0 && node.test !== null) {
								report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
									return fixer.replaceTextRange(rangeForHeader, `while (${context.sourceCode.getText(node.test!)}) `);
								};
							}
							context.report(report);
						}
					}
				};
			}
		};
	}
};
