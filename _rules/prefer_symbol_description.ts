import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			CallExpression(node: Deno.lint.CallExpression): void {
				if (node.callee.type === "Identifier" && node.callee.name === "Symbol" && node.arguments.length === 0) {
					context.report({
						node,
						message: `Prefer \`Symbol\` to have a description.`
					});
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "prefer-symbol-description",
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
