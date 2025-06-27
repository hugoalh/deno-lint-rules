import type { RuleData } from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			ForStatement(node: Deno.lint.ForStatement): void {
				if (node.init === null && node.update === null) {
					context.report({
						node,
						message: `The statement \`for\` without initializer statement and update statement, possibly replaceable by the statement \`while\`.`
					});
				}
			}
		};
	}
};
export const ruleData: RuleData = {
	identifier: "no-misuse-for",
	sets: [
		"recommended"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
