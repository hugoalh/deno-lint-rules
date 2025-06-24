import {
	getContextTextFromNodes,
	type RuleData
} from "../_utility.ts";
const ruleMessageUselessCase = `This \`switch\` case is pointless as covered by the default case.`;
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			SwitchStatement(node: Deno.lint.SwitchStatement): void {
				// Find useless `switch` statement.
				// NOTE: `switch` statement without any case is covered by rule `no-empty`.
				if (node.cases.flatMap(({ consequent }: Deno.lint.SwitchCase): Deno.lint.Statement[] => {
					return consequent;
				}).length === 0) {
					context.report({
						node,
						message: `Statement \`switch\` with cases but without consequent statements are useless.`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
							return fixer.remove(node);
						}
					});
				}

				// Find useless case which covered by the default case.
				const indexCaseDefault: number = node.cases.findIndex(({ test }: Deno.lint.SwitchCase): boolean => {
					return (test === null);
				});
				if (indexCaseDefault >= 0) {
					// Down
					if (node.cases[indexCaseDefault].consequent.length === 0) {
						for (const switchCase of node.cases.slice(indexCaseDefault + 1)) {
							const switchCaseHasConsequent: boolean = switchCase.consequent.length > 0;
							context.report({
								node: switchCase.test!,
								message: ruleMessageUselessCase,
								fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
									return (
										switchCaseHasConsequent
											? fixer.replaceText(switchCase, getContextTextFromNodes(context, switchCase.consequent))
											: fixer.remove(switchCase)
									);
								}
							});
							if (switchCaseHasConsequent) {
								break;
							}
						}
					}
					// Up
					for (const switchCase of node.cases.slice(0, indexCaseDefault).reverse()) {
						if (switchCase.consequent.length > 0) {
							break;
						}
						context.report({
							node: switchCase.test!,
							message: ruleMessageUselessCase,
							fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
								return fixer.remove(switchCase);
							}
						});
					}
				}
			}
		};
	}
};
export const ruleData: RuleData = {
	identifier: "no-useless-switch",
	sets: [
		"recommended"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
