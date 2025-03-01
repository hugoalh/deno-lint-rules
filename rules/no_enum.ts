import type { DenoLintRuleDataPre } from "../_utility.ts";
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			TSEnumDeclaration(node: Deno.lint.TSEnumDeclaration): void {
				context.report({
					node,
					message: `Enum is not type safe hence forbidden.`
				});
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-enum",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContextStatic;
	}
};
