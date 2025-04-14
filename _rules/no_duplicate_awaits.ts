import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			AwaitExpression(node: Deno.lint.AwaitExpression): void {
				if (node.parent.type !== "AwaitExpression") {
					let count: number = 0;
					let last: Deno.lint.AwaitExpression = node;
					while (last.argument.type === "AwaitExpression") {
						count += 1;
						last = last.argument;
					}
					if (count > 0) {
						const result: string = context.sourceCode.getText(last);
						context.report({
							node,
							message: `Multiple \`await\` operators have the same effect as single \`await\` operator, possibly not intended.`,
							hint: `Do you mean \`${result}\`?`,
							fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
								return fixer.replaceText(node, result);
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
