import type { DenoLintRuleDataPre } from "../_template.ts";
import { isMatchMemberExpressionPattern } from "../_utility.ts";
const ruleMessage = `Number literals with NaN is usually an error and not intended.`;
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			Identifier(node: Deno.lint.Identifier): void {
				// NaN
				if (node.name === "NaN" && node.parent.type !== "MemberExpression") {
					context.report({
						node,
						message: ruleMessage
					});
				}
			},
			MemberExpression(node: Deno.lint.MemberExpression): void {
				if (
					isMatchMemberExpressionPattern(node, ["Number", "NaN"]) ||
					isMatchMemberExpressionPattern(node, ["NaN"], true) ||
					isMatchMemberExpressionPattern(node, ["Number", "NaN"], true)
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
	identifier: "no-nan",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
