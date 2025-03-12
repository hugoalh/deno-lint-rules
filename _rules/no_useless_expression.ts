import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleMessage = `The expression will do nothing, likely missing the assignment or call.`;
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			ExpressionStatement(node: Deno.lint.ExpressionStatement): void {
				switch (node.expression.type) {
					case "Identifier":
						context.report({
							node,
							message: ruleMessage
							// NOTE: Fixer is temporary disabled to prevent accidentally broken the script.
							/*,
							fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
								return fixer.remove(node);
							}
							*/
						});
						break;
					case "Literal":
						context.report({
							node,
							message: ruleMessage
							// NOTE: No fixer for literal in order to prevent accidentally removed important data.
						});
						break;
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-useless-expression",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
