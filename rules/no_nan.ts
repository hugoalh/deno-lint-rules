import type { DenoLintRuleDataPre } from "../_utility.ts";
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			Literal(node: Deno.lint.Literal): void {
				if (typeof node.value === "number" && Number.isNaN(node.value)) {
					context.report({
						node,
						message: `Number literals with NaN is usually an error and not intended.`
					});
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-nan",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContextStatic;
	}
};
