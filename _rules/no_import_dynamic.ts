import type { RuleConstructContext } from "../_utility.ts";
export default {
	identifier: "no-import-dynamic",
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ImportExpression(node: Deno.lint.ImportExpression): void {
						context.report({
							node,
							message: `Import module dynamically is forbidden.`
						});
					}
				};
			}
		};
	}
} satisfies RuleConstructContext as RuleConstructContext;
