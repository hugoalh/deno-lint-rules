import {
	NodeMemberExpressionMatcher,
	type RuleData
} from "../_utility.ts";
const memNaN: NodeMemberExpressionMatcher = new NodeMemberExpressionMatcher(["NaN"], true);
const memNumberNaN: NodeMemberExpressionMatcher = new NodeMemberExpressionMatcher(["Number", "NaN"], "*");
const ruleMessage: string = `Use of \`NaN\` is possibly not intended.`;
export const ruleData: RuleData = {
	identifier: "no-nan",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Identifier(node: Deno.lint.Identifier): void {
						if (node.name === "NaN" && !(
							node.parent.type === "ImportSpecifier" ||
							node.parent.type === "MemberExpression"
						)) {
							context.report({
								node,
								message: ruleMessage
							});
						}
					},
					MemberExpression(node: Deno.lint.MemberExpression): void {
						if (
							memNaN.test(node) ||
							memNumberNaN.test(node)
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
	}
};
