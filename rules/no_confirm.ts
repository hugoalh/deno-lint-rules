import type { DenoLintRuleDataPre } from "../_utility.ts";
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			CallExpression(node: Deno.lint.CallExpression): void {
				if (node.callee.type === "Identifier" && node.callee.name === "confirm") {
					context.report({
						node,
						message: `Use of \`confirm\` is forbidden.`
					});
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-confirm",
	context(): Deno.lint.Rule {
		return ruleContextStatic;
	}
};
