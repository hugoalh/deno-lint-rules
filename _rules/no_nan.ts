import {
	isMemberExpressionMatchPattern,
	type RuleData
} from "../_utility.ts";
const ruleMessage = `Number literals with NaN is usually an error and not intended.`;
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
					isMemberExpressionMatchPattern(node, ["Number", "NaN"]) ||
					isMemberExpressionMatchPattern(node, ["NaN"], true) ||
					isMemberExpressionMatchPattern(node, ["Number", "NaN"], true)
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
	sets: ["recommended"],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
