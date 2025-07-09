import {
	MemberExpressionMatcher,
	type RuleData
} from "../_utility.ts";
const mem: MemberExpressionMatcher = new MemberExpressionMatcher(["undefined"], true);
const ruleContext: Deno.lint.Rule = {
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
export const ruleData: RuleData = {
	identifier: "prefer-symbol-description",
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
