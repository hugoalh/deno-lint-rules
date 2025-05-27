import type { RuleData } from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
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
export const ruleData: RuleData = {
	identifier: "no-useless-export",
	sets: [
		"recommended"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
