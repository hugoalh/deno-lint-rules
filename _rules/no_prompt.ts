import {
	NodeMemberExpressionMatcher,
	type RuleData
} from "../_utility.ts";
const mem: NodeMemberExpressionMatcher = new NodeMemberExpressionMatcher(["prompt"], "*");
const ruleMessage: string = `Use of \`prompt\` is forbidden.`;
export const ruleData: RuleData = {
	identifier: "no-prompt",
	tags: [
		"no-interaction"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Identifier(node: Deno.lint.Identifier): void {
						if (node.name === "prompt" && node.parent.type !== "MemberExpression") {
							context.report({
								node,
								message: ruleMessage
							});
						}
					},
					MemberExpression(node: Deno.lint.MemberExpression): void {
						if (mem.test(node)) {
							context.report({
								node,
								message: ruleMessage
							});
						}
					}
				};
			}
		};
	}
};
