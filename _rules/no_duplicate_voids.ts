import type { DenoLintRuleData } from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			UnaryExpression(node: Deno.lint.UnaryExpression): void {
				if (node.operator === "void" && !(node.parent.type === "UnaryExpression" && node.parent.operator === "void")) {
					const chain: Deno.lint.UnaryExpression[] = [];
					let last: Deno.lint.UnaryExpression = node;
					while (last.argument.type === "UnaryExpression" && last.argument.operator === "void") {
						chain.push(last);
						last = last.argument;
					}
					if (chain.length > 0) {
						context.report({
							node,
							message: `Multiple \`void\` operators have the same effect as single \`void\` operator, possibly not intended.`,
							hint: `Do you mean \`${context.sourceCode.getText(last)}\`?`,
							fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
								return chain.map((node: Deno.lint.UnaryExpression): Deno.lint.Fix => {
									return fixer.removeRange([node.range[0], node.range[0] + 4]);
								}).reverse();
							}
						});
					}
				}
			}
		};
	}
};
export const ruleData: DenoLintRuleData = {
	identifier: "no-duplicate-voids",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
