import {
	isMemberExpressionMatchPattern,
	type RuleData
} from "../_utility.ts";
const ruleMessage = `Use of \`alert\` is forbidden.`;
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			Identifier(node: Deno.lint.Identifier): void {
				if (node.name === "alert" && node.parent.type !== "MemberExpression") {
					context.report({
						node,
						message: ruleMessage
					});
				}
			},
			MemberExpression(node: Deno.lint.MemberExpression): void {
				if (isMemberExpressionMatchPattern(node, ["alert"], true)) {
					context.report({
						node,
						message: ruleMessage
					});
				}
			}
		};
	}
};
export const ruleData: RuleData = {
	identifier: "no-alert",
	sets: [
		"no-interaction"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
