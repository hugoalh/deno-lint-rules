import type { RuleData } from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "no-type-assertion-angle-bracket",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					TSTypeAssertion(node: Deno.lint.TSTypeAssertion): void {
						context.report({
							node,
							message: `Type assertion with angle bracket syntax can be confused with React syntax, also unable to use at the React module/script, hence forbidden.`,
							fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
								return fixer.replaceText(node, `${context.sourceCode.getText(node.expression)} as ${context.sourceCode.getText(node.typeAnnotation)}`);
							}
						});
					}
				};
			}
		};
	}
};
