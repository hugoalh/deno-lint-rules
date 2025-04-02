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
			},
			SwitchCase(node: Deno.lint.SwitchCase): void {
				for (const statement of node.consequent) {
					if (statement.type === "BlockStatement" && statement.body.length === 0) {
						context.report({
							node: statement,
							message: `Unnecessary block is forbidden.`,
							fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
								return fixer.remove(statement);
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
