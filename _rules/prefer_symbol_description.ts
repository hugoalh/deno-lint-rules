import {
	NodeMemberExpressionMatcher,
	type RuleData
} from "../_utility.ts";
const mem: NodeMemberExpressionMatcher = new NodeMemberExpressionMatcher(["undefined"], true);
export const ruleData: RuleData = {
	identifier: "prefer-symbol-description",
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					CallExpression(node: Deno.lint.CallExpression): void {
						if (node.callee.type === "Identifier" && node.callee.name === "Symbol" && (
							node.arguments.length === 0 ||

							// undefined
							(node.arguments[0].type === "Identifier" && node.arguments[0].name === "undefined") ||
							(node.arguments[0].type === "MemberExpression" && mem.test(node.arguments[0]))
						)) {
							context.report({
								node,
								message: `Prefer \`Symbol\` to have a description.`
							});
						}
					}
				};
			}
		};
	}
};
