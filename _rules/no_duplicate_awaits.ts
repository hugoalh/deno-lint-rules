import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			AwaitExpression(node: Deno.lint.AwaitExpression): void {
				if (node.parent.type !== "AwaitExpression") {
					const chain: Deno.lint.AwaitExpression[] = [];
					let last: Deno.lint.AwaitExpression = node;
					while (last.argument.type === "AwaitExpression") {
						chain.push(last);
						last = last.argument;
					}
					if (chain.length > 0) {
						context.report({
							node,
							message: `Multiple \`await\` operators have the same effect as single \`await\` operator, possibly not intended.`,
							hint: `Do you mean \`${context.sourceCode.getText(last)}\`?`,
							fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
								return chain.map((node: Deno.lint.AwaitExpression): Deno.lint.Fix => {
									return fixer.removeRange([node.range[0], node.range[0] + 5]);
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
	identifier: "no-duplicate-awaits",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
