import type { DenoLintRuleDataPre } from "../_template.ts";
import { getContextTextFromNodes } from "../_utility.ts";
const ruleMessageUselessCase = `This \`switch\` case is pointless as covered by the default case.`;
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			SwitchStatement(node: Deno.lint.SwitchStatement): void {
				const indexCaseDefault: number = node.cases.findIndex(({ test }: Deno.lint.SwitchCase): boolean => {
					return (test === null);
				});
				switch (node.cases.length) {
					case 0:
						context.report({
							node,
							message: `Empty \`switch\` statement is useless.`,
							fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
								return fixer.remove(node);
							}
						});
						break;
					case 1:
						context.report({
							node,
							message: `The statement \`switch\` with 1 case is pointless, and replaceable by the statement \`if\`.`
						});
						break;
					case 2:
						if (indexCaseDefault >= 0) {
							context.report({
								node,
								message: `The statement \`switch\` with 1 case and 1 default case is pointless, and replaceable by the statement \`if-else\`.`
							});
						}
						break;
				}
				if (indexCaseDefault >= 0) {
					// Down
					if (node.cases[indexCaseDefault].consequent.length === 0) {
						for (let index: number = indexCaseDefault + 1; index < node.cases.length; index += 1) {
							const switchCase: Deno.lint.SwitchCase = node.cases[index];
							const switchCaseHasConsequent: boolean = switchCase.consequent.length > 0;
							context.report({
								node: switchCaseHasConsequent ? switchCase.test! : switchCase,
								message: ruleMessageUselessCase,
								fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
									if (switchCaseHasConsequent) {
										return fixer.replaceText(switchCase, getContextTextFromNodes(context, switchCase.consequent));
									}
									return fixer.remove(switchCase);
								}
							});
							if (switchCaseHasConsequent) {
								break;
							}
						}
					}
					// Up
					for (let index: number = indexCaseDefault - 1; index >= 0; index -= 1) {
						const switchCase: Deno.lint.SwitchCase = node.cases[index];
						if (switchCase.consequent.length > 0) {
							break;
						}
						context.report({
							node: switchCase.test!,
							message: ruleMessageUselessCase,
							fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
								return fixer.remove(switchCase);
							}
						});
					}
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-useless-switch",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
