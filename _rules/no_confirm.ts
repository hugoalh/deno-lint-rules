import {
	MemberExpressionMatcher,
	type RuleData
} from "../_utility.ts";
const mem: MemberExpressionMatcher = new MemberExpressionMatcher(["confirm"], true);
const ruleMessage: string = `Use of \`confirm\` is forbidden.`;
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
	identifier: "no-confirm",
	sets: [
		"no-interaction"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
