import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			TSTypeAssertion(node: Deno.lint.TSTypeAssertion): void {
				const result: string = `${context.sourceCode.getText(node.expression)} as ${context.sourceCode.getText(node.typeAnnotation)}`;
				context.report({
					node,
					message: `Type assertion with angle bracket syntax can be confused with React syntax, also unable to use at the React module/script, hence forbidden.`,
					hint: `Do you mean \`${result}\`?`,
					fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
						return fixer.replaceText(node, result);
					}
				});
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-type-assertion-angle-bracket",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
