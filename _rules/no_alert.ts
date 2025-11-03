import {
	areNodesSame,
	NodeMemberExpressionMatcher,
	type RuleData
} from "../_utility.ts";
const mem: NodeMemberExpressionMatcher = new NodeMemberExpressionMatcher(["alert"], true);
function ruleReporter(context: Deno.lint.RuleContext, node: Deno.lint.Node): void {
	context.report({
		node,
		message: `Use of \`alert\` is forbidden.`
	});
}
export const ruleData: RuleData = {
	identifier: "no-alert",
	tags: [
		"no-interaction"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Identifier(node: Deno.lint.Identifier): void {
						if (node.name === "alert" && !(
							node.parent.type === "ImportSpecifier" ||
							(node.parent.type === "MemberExpression" && areNodesSame(node, node.parent.property))
						)) {
							ruleReporter(context, node);
						}
					},
					MemberExpression(node: Deno.lint.MemberExpression): void {
						if (mem.test(node)) {
							ruleReporter(context, node);
						}
					}
				};
			}
		};
	}
};
