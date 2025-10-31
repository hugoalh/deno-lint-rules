import type { RuleData } from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "no-using",
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					VariableDeclaration(node: Deno.lint.VariableDeclaration): void {
						if (
							node.kind === "await using" ||
							node.kind === "using"
						) {
							context.report({
								node,
								message: `Use of \`using\` statement is forbidden.`
							});
						}
					}
				};
			}
		};
	}
};
