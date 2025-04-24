import type { DenoLintRuleData } from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			CallExpression(node: Deno.lint.CallExpression): void {
				if (
					node.callee.type === "ArrowFunctionExpression" ||
					node.callee.type === "FunctionExpression"
				) {
					context.report({
						node,
						message: `Use of immediately invoked function expression (IIFE) is forbidden.`
					});
				}
			}
		};
	}
};
export const ruleData: DenoLintRuleData = {
	identifier: "no-iife",
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
