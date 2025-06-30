import {
	getCommentsFromRange,
	type RuleData
} from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			ForStatement(node: Deno.lint.ForStatement): void {
				if (node.init === null && node.update === null) {
					const report: Deno.lint.ReportData = {
						node,
						message: `The statement \`for\` without initializer statement and update statement, possibly replaceable by the statement \`while\`.`
					};
					const rangeForHeader: Deno.lint.Range = [node.range[0], node.body.range[0]];
					if (getCommentsFromRange(context, ...rangeForHeader).length === 0 && node.test !== null) {
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
export const ruleData: RuleData = {
	identifier: "no-misuse-for",
	sets: [
		"recommended"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
