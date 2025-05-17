import {
	isNodeBooleanLiteral,
	isNodeNoOperation,
	isNodeStringLiteral,
	type DenoLintRuleData
} from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			ExpressionStatement(node: Deno.lint.ExpressionStatement): void {
				let dispatch: boolean = false;
				let removable: boolean = false;
				switch (node.expression.type) {
					case "ArrowFunctionExpression":
						dispatch = true;
						break;
					case "ArrayExpression":
					case "TemplateLiteral":
						dispatch = isNodeNoOperation(node.expression);
						break;
					case "Identifier":
						dispatch = true;
						removable = true;
						break;
					case "Literal":
						dispatch = !(isNodeStringLiteral(node.expression) && node.expression.value === "use strict");
						removable = isNodeBooleanLiteral(node.expression);
						break;
				}
				if (dispatch) {
					const report: Deno.lint.ReportData = {
						node,
						message: `The expression will do nothing, possibly missing the assignment or call.`
					};
					if (removable && context.sourceCode.getCommentsInside(node.expression).length === 0) {
						report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
							return fixer.remove(node.expression);
						};
					}
					context.report(report);
				}
			}
		};
	}
};
export const ruleData: DenoLintRuleData = {
	identifier: "no-useless-expression",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
