import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleMessage = `Boolean ternaries are pointless hence forbidden.`;
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			ConditionalExpression(node: Deno.lint.ConditionalExpression): void {
				if (node.consequent.type === "Literal" && node.alternate.type === "Literal") {
					if (node.consequent.value === true && node.alternate.value === false) {
						context.report({
							node,
							message: ruleMessage,
							fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
								return fixer.replaceText(node, context.sourceCode.getText(node.test));
							}
						});
					} else if (node.consequent.value === false && node.alternate.value === true) {
						context.report({
							node,
							message: ruleMessage,
							fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
								return fixer.replaceText(node, `!(${context.sourceCode.getText(node.test)})`);
							}
						});
					}
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-ternary-boolean",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContextStatic;
	}
};
