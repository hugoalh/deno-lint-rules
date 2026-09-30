import type { RuleConstructContext } from "../_utility.ts";
export default {
	identifier: "curly-arrow-function",
	tags: [
		"curly",
		"fmt"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ArrowFunctionExpression(node: Deno.lint.ArrowFunctionExpression): void {
						if (node.body.type !== "BlockStatement") {
							context.report({
								node: node.body,
								message: `Require the body of the arrow function expression is in block.`
							});
						}
					}
				};
			}
		};
	}
} satisfies RuleConstructContext as RuleConstructContext;
