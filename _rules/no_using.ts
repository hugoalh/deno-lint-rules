import type { RuleData } from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			VariableDeclaration(node: Deno.lint.VariableDeclaration): void {
				if (
					node.kind === "await using" ||
					node.kind === "using"
				) {
					context.report({
						node,
						message: `Use of \`using\` or \`await using\` is forbidden.`
					});
				}
			}
		};
	}
};
export const ruleData: RuleData = {
	identifier: "no-using",
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
