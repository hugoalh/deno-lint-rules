import type { DenoLintRuleData } from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			ExpressionStatement(node: Deno.lint.ExpressionStatement): void {
				if ((
					node.expression.type === "ArrowFunctionExpression" ||
					node.expression.type === "Identifier" ||
					node.expression.type === "Literal"
				)) {
					context.report({
						node,
						message: `The expression will do nothing, possibly missing the assignment or call.`
					});
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
