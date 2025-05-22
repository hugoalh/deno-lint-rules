import type { RuleData } from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			UnaryExpression(node: Deno.lint.UnaryExpression): void {
				if (node.operator === "typeof" && node.argument.type === "UnaryExpression" && node.argument.operator === "typeof") {
					const range: Deno.lint.Range = [node.range[0], node.range[0] + 6];
					context.report({
						range,
						message: `Multiple \`typeof\`s always return \`"string"\`, possibly not intended.`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
							return fixer.removeRange(range);
						}
					});
				}
			}
		};
	}
};
export const ruleData: RuleData = {
	identifier: "no-duplicate-typeofs",
	sets: ["recommended"],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
