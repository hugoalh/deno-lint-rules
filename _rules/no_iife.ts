import type { RuleConstructContext } from "../_utility.ts";
export default {
	identifier: "no-iife",
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					CallExpression(node: Deno.lint.CallExpression): void {
						if (
							node.callee.type === "ArrowFunctionExpression" ||
							node.callee.type === "FunctionExpression"
						) {
							context.report({
								node,
								message: `Use of IIFE is forbidden.`
							});
						}
					}
				};
			}
		};
	}
} satisfies RuleConstructContext;
