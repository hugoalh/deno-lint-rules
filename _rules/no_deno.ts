import {
	areNodesSame,
	NodeMemberExpressionMatcher,
	type RuleData
} from "../_utility.ts";
const mem: NodeMemberExpressionMatcher = new NodeMemberExpressionMatcher(["Deno"], true);
const ruleMessage: string = `Use of \`Deno\` is forbidden.`;
export const ruleData: RuleData = {
	identifier: "no-deno",
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Identifier(node: Deno.lint.Identifier): void {
						if (node.name === "Deno" && ((node.parent.type === "MemberExpression") ? areNodesSame(node, node.parent.object) : true)) {
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
