import {
	NodeMemberExpressionMatcher,
	type RuleData
} from "../_utility.ts";
const mem: NodeMemberExpressionMatcher = new NodeMemberExpressionMatcher(["confirm"], true);
const ruleMessage: string = `Use of \`confirm\` is forbidden.`;
export const ruleData: RuleData = {
	identifier: "no-confirm",
	tags: [
		"no-interaction"
	],
	querier(): Deno.lint.Rule {
		return {
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
