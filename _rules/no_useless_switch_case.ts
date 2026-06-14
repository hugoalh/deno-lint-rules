import type { RuleConstructContext } from "../_utility.ts";
const ruleMessage: string = `The \`switch\` case is also covered by the default case, possibly removable.`;
export default {
	identifier: "no-useless-switch-case",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					SwitchStatement(node: Deno.lint.SwitchStatement): void {
						const indexCaseDefault: number = node.cases.findIndex(({ test }: Deno.lint.SwitchCase): boolean => {
							return (test === null);
						});
						if (indexCaseDefault >= 0) {
							// Downward
							if (node.cases[indexCaseDefault].consequent.length === 0) {
								for (const switchCase of node.cases.slice(indexCaseDefault + 1)) {
									if (switchCase.consequent.length > 0) {
										context.report({
											node: switchCase.test!,
											message: ruleMessage,
											fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
												return fixer.replaceText(switchCase, context.sourceCode.text.slice(switchCase.consequent[0].range[0], switchCase.consequent.at(-1)!.range[1]));
											}
										});
										break;
									}
									context.report({
										node: switchCase,
										message: ruleMessage,
										fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
											return fixer.remove(switchCase);
										}
									});
								}
							}

							// Upward
							for (const switchCase of node.cases.slice(0, indexCaseDefault).reverse()) {
								if (switchCase.consequent.length > 0) {
									break;
								}
								context.report({
									node: switchCase,
									message: ruleMessage,
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
} satisfies RuleConstructContext as RuleConstructContext;
