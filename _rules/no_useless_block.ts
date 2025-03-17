import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			BlockStatement(node: Deno.lint.BlockStatement): void {
				if (node.body.length === 1) {
					const body: Deno.lint.Statement = node.body[0];
					if (body.type === "BlockStatement") {
						context.report({
							node: body,
							message: `Unnecessary block nest is forbidden.`,
							fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
								return fixer.replaceText(node, context.sourceCode.getText(body));
							}
						});
					}
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-useless-block",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
