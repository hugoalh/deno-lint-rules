import type { RuleData } from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "no-empty-yield",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
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
	}
};
