import type { DenoLintRuleData } from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			AwaitExpression(node: Deno.lint.AwaitExpression): void {
				if (node.argument.type === "AwaitExpression") {
					const range: Deno.lint.Range = [node.range[0], node.range[0] + 5];
					context.report({
						range,
						message: `Multiple \`await\` operators have the same effect as single \`await\` operator, possibly not intended.`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
							return fixer.removeRange(range);
						}
					});
				}
			}
		};
	}
};
export const ruleData: DenoLintRuleData = {
	identifier: "no-duplicate-awaits",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
