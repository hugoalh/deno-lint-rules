import type { RuleData } from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
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
export const ruleData: RuleData = {
	identifier: "no-import-dynamic",
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
