import type { RuleData } from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "curly-arrow-function",
	tags: [
		"curly"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ArrowFunctionExpression(node: Deno.lint.ArrowFunctionExpression): void {
						if (node.body.type !== "BlockStatement") {
							context.report({
								node: node.body,
								message: `Require the body of the arrow function expression is in block.`,
								fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
									return [
										fixer.insertTextAfter(node.body, "}"),
										fixer.insertTextBefore(node.body, "{return ")
									];
								}
							});
						}
					}
				};
			}
		};
	}
};
