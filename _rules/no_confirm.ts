import type { DenoLintRuleDataPre } from "../_template.ts";
import { isMatchMemberExpressionPattern } from "../_utility.ts";
const ruleMessage = `Use of \`confirm\` is forbidden.`;
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			Identifier(node: Deno.lint.Identifier): void {
				if (node.name === "confirm" && node.parent.type !== "MemberExpression") {
					context.report({
						node,
						message: ruleMessage
					});
				}
			},
			MemberExpression(node: Deno.lint.MemberExpression): void {
				if (isMatchMemberExpressionPattern(node, ["confirm"], true)) {
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
	identifier: "no-confirm",
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
