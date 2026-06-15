import {
	isNodeBooleanLiteral,
	isNodeHasOperation,
	isNodeNullLiteral,
	isNodeStringLiteral,
	type RuleConstructContext
} from "../_utility.ts";
export default {
	identifier: "no-useless-expression",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ExpressionStatement(node: Deno.lint.ExpressionStatement): void {
						if ((node.expression.type === "Literal") ? !(isNodeStringLiteral(node.expression) && node.expression.value === "use strict") : !isNodeHasOperation(node.expression)) {
							const report: Deno.lint.ReportData = {
								node,
								message: `The expression will do nothing, possibly missing the assignment or call.`
							};
							if ((
								node.expression.type === "Identifier" ||
								(node.expression.type === "Literal" && (
									isNodeBooleanLiteral(node.expression) ||
									isNodeNullLiteral(node.expression)
								))
							) && context.sourceCode.getCommentsInside(node).length === 0) {
								report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
									return fixer.remove(node);
								};
							}
							context.report(report);
						}
					}
				};
			}
		};
	}
} satisfies RuleConstructContext as RuleConstructContext;
