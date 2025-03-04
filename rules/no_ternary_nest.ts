import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleMessage = `Nested ternaries are forbidden.`;
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			ConditionalExpression(node: Deno.lint.ConditionalExpression): void {
				if (node.consequent.type === "ConditionalExpression") {
					context.report({
						node: node.consequent,
						message: ruleMessage
					});
				}
				if (node.alternate.type === "ConditionalExpression") {
					context.report({
						node: node.alternate,
						message: ruleMessage
					});
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-ternary-nest",
	context(): Deno.lint.Rule {
		return ruleContextStatic;
	}
};
