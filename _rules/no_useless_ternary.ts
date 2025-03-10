import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			ConditionalExpression(node: Deno.lint.ConditionalExpression): void {
				if ((
					node.test.type === "BinaryExpression" ||
					node.test.type === "LogicalExpression"
				) && node.consequent.type === "Literal" && node.alternate.type === "Literal" && typeof node.consequent.value === "boolean" && typeof node.alternate.value === "boolean") {
					const consequent: boolean = node.consequent.value;
					const alternate: boolean = node.alternate.value;
					context.report({
						node,
						message: `Ternary with boolean expression and return boolean is pointless.`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
							if (consequent && !alternate) {
								return fixer.replaceText(node, context.sourceCode.getText(node.test));
							}
							if (!consequent && alternate) {
								return fixer.replaceText(node, context.sourceCode.getText(node.test));
							}
							return fixer.replaceText(node, String(consequent));
						}
					});
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
