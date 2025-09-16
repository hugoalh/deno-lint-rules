import {
	getNodesRaw,
	type RuleData
} from "../_utility.ts";
const ruleMessageUselessCase: string = `This \`switch\` case is also covered by the default case, possibly removable.`;
export const ruleData: RuleData = {
	identifier: "no-useless-switch",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					SwitchStatement(node: Deno.lint.SwitchStatement): void {
						// Find `switch` with cases but without consequent statements.
						// NOTE: `switch` without any case is handled by rule `no-empty`.
						if (node.cases.every(({ consequent }: Deno.lint.SwitchCase): boolean => {
							return (consequent.length === 0);
						})) {
							context.report({
								node,
								message: `Statement \`switch\` with cases but without consequent statements is useless.`,
								fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
									return fixer.remove(node);
								}
							});
						}

						// Find `switch` with only the default case and with consequent statements.
						// NOTE: `switch` with only the default case and without consequent statements is already handled by the previous condition.
						if (node.cases.length === 1 && node.cases[0].test === null && node.cases[0].consequent.length > 0) {
							context.report({
								node,
								message: `Statement \`switch\` with only the default case is useless.`,
								fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
									return fixer.replaceText(node, getNodesRaw(context, node.cases[0].consequent));
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
													? fixer.replaceText(switchCase, getNodesRaw(context, switchCase.consequent))
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
	}
};
