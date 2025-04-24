import type { DenoLintRuleData } from "../_utility.ts";
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
export const ruleData: DenoLintRuleData = {
	identifier: "no-enum",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
