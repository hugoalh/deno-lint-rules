import type { RuleData } from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "no-decorator",
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Decorator(node: Deno.lint.Decorator): void {
						context.report({
							node,
							message: `Use of decorator is forbidden.`
						});
					}
				};
			}
		};
	}
};
