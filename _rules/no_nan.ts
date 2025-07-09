import {
	MemberExpressionMatcher,
	type RuleData
} from "../_utility.ts";
const memNaN: MemberExpressionMatcher = new MemberExpressionMatcher(["NaN"], true);
const memNumberNaN: MemberExpressionMatcher = new MemberExpressionMatcher(["Number", "NaN"], true);
const ruleMessage: string = `Number literals with NaN is usually an error and not intended.`;
const ruleContext: Deno.lint.Rule = {
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
export const ruleData: RuleData = {
	identifier: "no-nan",
	sets: [
		"recommended"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
