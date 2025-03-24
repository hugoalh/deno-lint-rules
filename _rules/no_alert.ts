import type { DenoLintRuleDataPre } from "../_template.ts";
import {
	getClosestAncestor,
	isMatchMemberExpressionPattern
} from "../_utility.ts";
const ruleMessage = `Use of \`alert\` is forbidden.`;
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			Identifier(node: Deno.lint.Identifier): void {
				// alert
				if (node.name === "alert") {
					if ((getClosestAncestor(context, node)).type !== "MemberExpression") {
						context.report({
							node,
							message: ruleMessage
						});
					}
				}
			},
			MemberExpression(node: Deno.lint.MemberExpression): void {
				if (
					isMatchMemberExpressionPattern(node, ["globalThis", "alert"]) ||
					isMatchMemberExpressionPattern(node, ["window", "alert"]) ||
					isMatchMemberExpressionPattern(node, ["globalThis", "window", "alert"])
				) {
					context.report({
						node,
						message: ruleMessage
					});
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-alert",
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
