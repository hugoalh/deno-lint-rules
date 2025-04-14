import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			UnaryExpression(node: Deno.lint.UnaryExpression): void {
				if (node.operator === "typeof") {
					if (!(node.parent.type === "UnaryExpression" && node.parent.operator === "typeof")) {
						let count: number = 0;
						let last: Deno.lint.UnaryExpression = node;
						while (last.argument.type === "UnaryExpression" && last.argument.operator === "typeof") {
							count += 1;
							last = last.argument;
						}
						if (count > 0) {
							const result: string = context.sourceCode.getText(last);
							context.report({
								node,
								message: `Multiple \`typeof\` operators always return \`"string"\`, possibly not intended.`,
								hint: `Do you mean \`${result}\`?`,
								fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
									return fixer.replaceText(node, result);
								}
							});
						}
					}
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-duplicate-typeofs",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
