import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			ExpressionStatement(node: Deno.lint.ExpressionStatement): void {
				if ((
					node.expression.type === "Identifier" ||
					node.expression.type === "Literal"
				)) {
					context.report({
						node,
						message: `The expression will do nothing, possibly missing the assignment or call.`
						// NOTE: No fixer in order to prevent accidentally broken the script or removed important data.
					});
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-useless-expression",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
