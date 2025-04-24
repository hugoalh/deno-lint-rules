import type { DenoLintRuleData } from "../_utility.ts";
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
export const ruleData: DenoLintRuleData = {
	identifier: "no-import-dynamic",
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
