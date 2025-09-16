import type { RuleData } from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "no-duplicate-awaits",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					AwaitExpression(node: Deno.lint.AwaitExpression): void {
						if (node.argument.type === "AwaitExpression") {
							const range: Deno.lint.Range = [node.range[0], node.range[0] + 5];
							context.report({
								range,
								message: `Multiple \`await\`s have the same effect as single \`await\`, possibly not intended.`,
								fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
									return fixer.removeRange(range);
								}
							});
						}
					}
				};
			}
		};
	}
};
