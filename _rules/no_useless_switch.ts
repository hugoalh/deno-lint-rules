import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			SwitchStatement(node: Deno.lint.SwitchStatement): void {
				const casesTest: readonly (Deno.lint.Expression | null)[] = node.cases.map(({ test }: Deno.lint.SwitchCase): Deno.lint.Expression | null => {
					return test;
				});
				switch (casesTest.length) {
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
						if (casesTest.includes(null)) {
							context.report({
								node,
								message: `The statement \`switch\` with 1 case and 1 default case is pointless, and replaceable by the statement \`if-else\`.`
							});
						}
						break;
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
