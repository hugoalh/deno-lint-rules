import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			ConditionalExpression(node: Deno.lint.ConditionalExpression): void {
				if (node.consequent.type === "Literal" && node.alternate.type === "Literal") {
					if (node.consequent.value === node.alternate.value) {
						const result: string = context.sourceCode.getText(node.consequent);
						context.report({
							node,
							message: `Ternary with same result is useless.`,
							hint: `Do you mean \`${result}\`?`,
							fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
								return fixer.replaceText(node, result);
							}
						});
					} else if (typeof node.consequent.value === "boolean" && typeof node.alternate.value === "boolean") {
						// NOTE: It is impossible to have cases of `x ? true : true` or `x ? false : false` at here, which already handled by the previous condition.
						const target: string = context.sourceCode.getText(node.test);
						const targetNeedWrap: boolean = !(
							node.test.type === "BinaryExpression" ||
							node.test.type === "LogicalExpression"
						);
						const targetWrap: string = targetNeedWrap ? `Boolean(${target})` : target;
						const result: string = (node.consequent.value && !node.alternate.value) ? targetWrap : `!${targetNeedWrap ? targetWrap : `(${targetWrap})`}`;
						context.report({
							node,
							message: `Ternary with boolean result is useless.`,
							hint: `Do you mean \`${result}\`?`,
							fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
								return fixer.replaceText(node, result);
							}
						});
					}
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-useless-ternary",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
