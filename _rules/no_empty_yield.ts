import type { RuleConstructContext } from "../_utility.ts";
export default {
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
								message: `Empty \`yield\` is forbidden; Possibly missing the expression.`
							});
						}
					}
				};
			}
		};
	}
} satisfies RuleConstructContext;
