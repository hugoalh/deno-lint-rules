import {
	MemberExpressionMatcher,
	type RuleData
} from "../_utility.ts";
const mem: MemberExpressionMatcher = new MemberExpressionMatcher(["alert"], true);
const ruleMessage: string = `Use of \`alert\` is forbidden.`;
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
export const ruleData: RuleData = {
	identifier: "no-alert",
	sets: [
		"no-interaction"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
