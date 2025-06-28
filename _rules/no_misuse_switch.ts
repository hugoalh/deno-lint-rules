import type { RuleData } from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			SwitchStatement(node: Deno.lint.SwitchStatement): void {
				switch (node.cases.length) {
					case 1:
						// NOTE: `switch` with only the default case is handled by rule `hugoalh/no-useless-switch`.
						if (node.cases[0].test !== null) {
							context.report({
								node,
								message: `The statement \`switch\` with only 1 case, possibly replaceable by the statement \`if\`.`
							});
						}
						break;
					case 2:
						if (node.cases.some(({ test }: Deno.lint.SwitchCase): boolean => {
							return (test === null);
						})) {
							context.report({
								node,
								message: `The statement \`switch\` with only 1 case and the default case, possibly replaceable by the statement \`if-else\`.`
							});
						}
						break;
				}
			}
		};
	}
};
export const ruleData: RuleData = {
	identifier: "no-misuse-switch",
	sets: [
		"recommended"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
