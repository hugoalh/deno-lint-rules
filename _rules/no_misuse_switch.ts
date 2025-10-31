import type { RuleData } from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "no-misuse-switch",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					SwitchStatement(node: Deno.lint.SwitchStatement): void {
						switch (node.cases.length) {
							case 0:
								// NOTE: `switch` statement without any case is handled by rule `no-empty`.
								break;
							case 1:
								if (node.cases[0].test === null) {
									// With only the default case.
									const report: Deno.lint.ReportData = {
										node,
										message: `\`switch\` statement with only the default case is useless.`
									};
									if (node.cases[0].consequent.length === 0) {
										report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
											return fixer.remove(node.cases[0]);
										};
									}
									context.report(report);
								} else {
									// With only 1 case.
									context.report({
										node,
										message: `\`switch\` statement with only 1 case is possibly replaceable by the \`if\` statement.`
									});
								}
								break;
							case 2:
								if (node.cases.some(({ test }: Deno.lint.SwitchCase): boolean => {
									return (test === null);
								})) {
									context.report({
										node,
										message: `\`switch\` statement with only 1 case and the default case is possibly replaceable by the \`if-else\` statement.`
									});
								}
								break;
							default:
								// Detect `switch` statement with cases but without any consequent statement.
								if (node.cases.every(({ consequent }: Deno.lint.SwitchCase): boolean => {
									return (consequent.length === 0);
								})) {
									context.report({
										node,
										message: `\`switch\` statement with cases but without any consequent statement is useless.`,
										fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
											return node.cases.map((switchCase: Deno.lint.SwitchCase): Deno.lint.Fix => {
												return fixer.remove(switchCase);
											});
										}
									});
								}
								break;
						}
					}
				};
			}
		};
	}
};
