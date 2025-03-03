import type { DenoLintRuleDataPre } from "../_utility.ts";
const ruleMessage = `Number literals with values equal to 2^53 or greater are too large to be represented accurately.`;
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			Literal(node: Deno.lint.Literal): void {
				if (typeof node.value === "number" && !Number.isNaN(node.value) && (
					node.value < Number.MIN_SAFE_INTEGER ||
					node.value > Number.MAX_SAFE_INTEGER
				)) {
					context.report({
						node,
						message: ruleMessage
					});
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-unsafe-number",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContextStatic;
	}
};
