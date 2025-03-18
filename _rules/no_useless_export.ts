import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			ExportNamedDeclaration(node: Deno.lint.ExportNamedDeclaration): void {
				if (node.declaration === null && node.specifiers.length === 0) {
					context.report({
						node,
						message: `Empty \`export\` statement is useless.`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
							return fixer.remove(node);
						}
					});
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-useless-export",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
