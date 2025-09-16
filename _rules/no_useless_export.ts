import type { RuleData } from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "no-useless-export",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ExportNamedDeclaration(node: Deno.lint.ExportNamedDeclaration): void {
						if (node.declaration === null && node.specifiers.length === 0) {
							context.report({
								node,
								message: `Empty \`export\` statement is useless.`,
								fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
									return fixer.remove(node);
								}
							});
						}
					}
				};
			}
		};
	}
};
