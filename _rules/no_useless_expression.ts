import {
	isNodeBooleanLiteral,
	isNodeHasOperation,
	isNodeNullLiteral,
	isNodeStringLiteral,
	type RuleData
} from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "no-useless-expression",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
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
							case "ConditionalExpression":
							case "TemplateLiteral":
								dispatch = !isNodeHasOperation(node.expression);
								break;
							case "Identifier":
								dispatch = true;
								removable = true;
								break;
							case "Literal":
								dispatch = !(isNodeStringLiteral(node.expression) && node.expression.value === "use strict");
								removable = (
									isNodeBooleanLiteral(node.expression) ||
									isNodeNullLiteral(node.expression)
								);
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
	}
};
