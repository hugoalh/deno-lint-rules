import type { RuleData } from "../_utility.ts";
const ruleMessage = `Nested ternaries are forbidden.`;
const ruleContext: Deno.lint.Rule = {
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
export const ruleData: RuleData = {
	identifier: "no-ternary-nest",
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
