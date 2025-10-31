import type { RuleData } from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "curly-with",
	tags: [
		"curly"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					WithStatement(node: Deno.lint.WithStatement): void {
						if (node.body.type !== "BlockStatement") {
							context.report({
								node: node.body,
								message: `Require the body of the \`with\` statement is in block.`,
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
};
