import type { RuleData } from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "no-void",
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					UnaryExpression(node: Deno.lint.UnaryExpression): void {
						if (node.operator === "void") {
							context.report({
								node,
								message: `Use of \`void\` operator is forbidden.`
							});
						}
					}
				};
			}
		};
	}
};
