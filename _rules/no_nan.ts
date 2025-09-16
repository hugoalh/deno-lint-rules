import {
	NodeMemberExpressionMatcher,
	type RuleData
} from "../_utility.ts";
const memNaN: NodeMemberExpressionMatcher = new NodeMemberExpressionMatcher(["NaN"], "*");
const memNumberNaN: NodeMemberExpressionMatcher = new NodeMemberExpressionMatcher(["Number", "NaN"], "*");
const ruleMessage: string = `Number literals with NaN is usually an error and not intended.`;
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
						if (node.name === "NaN" && node.parent.type !== "MemberExpression") {
							context.report({
								node,
								message: ruleMessage
							});
						}
					},
					MemberExpression(node: Deno.lint.MemberExpression): void {
						if (memNaN.test(node) ||
							memNumberNaN.test(node)) {
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
