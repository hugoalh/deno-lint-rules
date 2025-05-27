import type { RuleData } from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			UnaryExpression(node: Deno.lint.UnaryExpression): void {
				if (node.operator === "void") {
					context.report({
						node,
						message: `Use of \`void\` is forbidden.`,
					});
				}
			}
		};
	}
};
export const ruleData: RuleData = {
	identifier: "no-void",
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
