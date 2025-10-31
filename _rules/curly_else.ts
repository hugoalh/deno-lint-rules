import type { RuleData } from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "curly-else",
	tags: [
		"curly"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					IfStatement(node: Deno.lint.IfStatement): void {
						if (!(
							node.alternate === null ||
							node.alternate.type === "BlockStatement" ||
							node.alternate.type === "IfStatement"
						)) {
							context.report({
								node: node.alternate,
								message: `Require the body of the \`else\` statement is in block.`,
								fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
									return [
										fixer.insertTextAfter(node.alternate!, "}"),
										fixer.insertTextBefore(node.alternate!, "{")
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
