import type { RuleData } from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
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
export const ruleData: RuleData = {
	identifier: "no-decorator",
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
