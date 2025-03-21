import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			YieldExpression(node: Deno.lint.YieldExpression): void {
				if (node.argument === null) {
					context.report({
						node,
						message: `Empty \`yield\` is forbidden, possibly missing the expression.`
					});
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-empty-yield",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
