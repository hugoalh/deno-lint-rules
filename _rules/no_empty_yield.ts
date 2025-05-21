import type { RuleData } from "../_utility.ts";
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
export const ruleData: RuleData = {
	identifier: "no-empty-yield",
	sets: ["recommended"],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
