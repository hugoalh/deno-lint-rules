import type { DenoLintRuleDataPre } from "../_template.ts";
import {
	getContextTextFromNodes,
	isStatementsHasDeclaration
} from "../_utility.ts";
function ruleAssertor(context: Deno.lint.RuleContext, statements: readonly Deno.lint.Statement[], nest: boolean = false): void {
	for (const statement of statements) {
		if (statement.type === "BlockStatement") {
			const isEmpty: boolean = statement.body.length === 0;
			const isNoDeclaration: boolean = !isStatementsHasDeclaration(statement.body);
			if (
				isEmpty ||
				isNoDeclaration
			) {
				const report: Deno.lint.ReportData = {
					node: statement,
					message: `Unnecessary block ${nest ? "nest " : ""}is forbidden.`
				};
				if (isEmpty) {
					report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix => {
						return fixer.remove(statement);
					};
				} else if (isNoDeclaration) {
					report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix => {
						return fixer.replaceText(statement, getContextTextFromNodes(context, statement.body));
					};
				}
				context.report(report);
			}
		}
	}
}
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			BlockStatement(node: Deno.lint.BlockStatement): void {
				ruleAssertor(context, node.body, true);
			},
			Program(node: Deno.lint.Program): void {
				ruleAssertor(context, node.body);
			},
			SwitchCase(node: Deno.lint.SwitchCase): void {
				ruleAssertor(context, node.consequent);
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-useless-block",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
