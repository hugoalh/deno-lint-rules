import {
	isNodeBlockStatementHasDeclaration,
	type RuleData
} from "../_utility.ts";
function ruleAssertor(nest: boolean, context: Deno.lint.RuleContext, statements: readonly Deno.lint.Statement[]): void {
	for (const statement of statements) {
		if (statement.type === "BlockStatement") {
			const isEmpty: boolean = statement.body.length === 0;
			const isNoDeclaration: boolean = !isNodeBlockStatementHasDeclaration(statement);
			if (
				isEmpty ||
				isNoDeclaration
			) {
				const report: Deno.lint.ReportData = {
					node: statement,
					message: `Unnecessary block ${nest ? "nest " : ""}is forbidden.`
				};
				if (isEmpty) {
					report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
						return fixer.remove(statement);
					};
				} else if (isNoDeclaration) {
					const [
						rangeBegin,
						rangeEnd
					]: Deno.lint.Range = statement.range;
					report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
						return [
							fixer.removeRange([rangeEnd - 1, rangeEnd]),
							fixer.removeRange([rangeBegin, rangeBegin + 1])
						];
					};
				}
				context.report(report);
			}
		}
	}
}
export const ruleData: RuleData = {
	identifier: "no-useless-block",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					BlockStatement(node: Deno.lint.BlockStatement): void {
						ruleAssertor(true, context, node.body);
					},
					Program(node: Deno.lint.Program): void {
						ruleAssertor(false, context, node.body);
					},
					SwitchCase(node: Deno.lint.SwitchCase): void {
						ruleAssertor(false, context, node.consequent);
					}
				};
			}
		};
	}
};
