import type { RuleData } from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "no-useless-template-string",
	querier(): Deno.lint.Rule {
		return {
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
	}
};
