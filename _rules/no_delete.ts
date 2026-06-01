import type { RuleConstructContext } from "../_utility.ts";
export default {
	identifier: "no-delete",
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					UnaryExpression(node: Deno.lint.UnaryExpression): void {
						if (node.operator === "delete") {
							context.report({
								node,
								message: `Use of \`delete\` operator is forbidden.`
							});
						}
					}
				};
			}
		};
	}
} satisfies RuleConstructContext as RuleConstructContext;
