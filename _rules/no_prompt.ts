import {
	NodeMemberExpressionMatcher,
	type RuleData
} from "../_utility.ts";
const mem: NodeMemberExpressionMatcher = new NodeMemberExpressionMatcher(["prompt"], true);
function ruleReporter(context: Deno.lint.RuleContext, node: Deno.lint.Node): void {
	context.report({
		node,
		message: `Use of \`prompt\` is forbidden.`
	});
}
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
						if (node.name === "prompt" && !(
							node.parent.type === "ImportSpecifier" ||
							node.parent.type === "MemberExpression"
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
