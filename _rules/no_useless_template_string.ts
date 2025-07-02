import type { RuleData } from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			TemplateLiteral(node: Deno.lint.TemplateLiteral): void {
				if (node.expressions.length === 0) {
					context.report({
						node,
						message: `Use of template string without any expression is forbidden.`
					});
				}
			}
		};
	}
};
export const ruleData: RuleData = {
	identifier: "no-useless-template-string",
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
