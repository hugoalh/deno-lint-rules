import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			UnaryExpression(node: Deno.lint.UnaryExpression): void {
				if (node.operator === "typeof" && !(node.parent.type === "UnaryExpression" && node.parent.operator === "typeof")) {
					const chain: Deno.lint.UnaryExpression[] = [];
					let last: Deno.lint.UnaryExpression = node;
					while (last.argument.type === "UnaryExpression" && last.argument.operator === "typeof") {
						chain.push(last);
						last = last.argument;
					}
					if (chain.length > 0) {
						context.report({
							node,
							message: `Multiple \`typeof\` operators always return \`"string"\`, possibly not intended.`,
							hint: `Do you mean \`${context.sourceCode.getText(last)}\`?`,
							fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
								return chain.map((node: Deno.lint.UnaryExpression): Deno.lint.Fix => {
									return fixer.removeRange([node.range[0], node.range[0] + 6]);
								}).reverse();
							}
						});
					}
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-duplicate-typeofs",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
