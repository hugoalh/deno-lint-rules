import type { DenoLintRuleDataPre } from "../_template.ts";
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
export const data: DenoLintRuleDataPre = {
	identifier: "no-import-dynamic",
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
