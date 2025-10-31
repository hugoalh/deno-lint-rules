import type { RuleData } from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "curly-if",
	tags: [
		"curly"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					IfStatement(node: Deno.lint.IfStatement): void {
						if (node.consequent.type !== "BlockStatement") {
							context.report({
								node: node.consequent,
								message: `Require the body of the \`if\` statement is in block.`,
								fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
									return [
										fixer.insertTextAfter(node.consequent, "}"),
										fixer.insertTextBefore(node.consequent, "{")
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
