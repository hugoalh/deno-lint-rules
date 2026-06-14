import type { RuleConstructContext } from "../_utility.ts";
export default {
	identifier: "curly-for",
	tags: [
		"curly",
		"fmt"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ForStatement(node: Deno.lint.ForStatement): void {
						if (node.body.type !== "BlockStatement") {
							context.report({
								node: node.body,
								message: `Require the body of the \`for\` statement is in block.`,
								fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
									return [
										fixer.insertTextAfter(node.body, "}"),
										fixer.insertTextBefore(node.body, "{")
									];
								}
							});
						}
					}
				};
			}
		};
	}
} satisfies RuleConstructContext as RuleConstructContext;
