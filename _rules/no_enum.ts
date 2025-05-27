import type { RuleData } from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			TSEnumDeclaration(node: Deno.lint.TSEnumDeclaration): void {
				context.report({
					node,
					message: `\`enum\` is not type safe hence forbidden.`
				});
			}
		};
	}
};
export const ruleData: RuleData = {
	identifier: "no-enum",
	sets: [
		"recommended"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
