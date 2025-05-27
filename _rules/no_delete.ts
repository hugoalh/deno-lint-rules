import type { RuleData } from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			UnaryExpression(node: Deno.lint.UnaryExpression): void {
				if (node.operator === "delete") {
					context.report({
						node,
						message: `Use of \`delete\` is forbidden.`,
					});
				}
			}
		};
	}
};
export const ruleData: RuleData = {
	identifier: "no-delete",
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
