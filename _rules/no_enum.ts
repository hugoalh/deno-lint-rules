import type { RuleData } from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "no-enum",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					TSEnumDeclaration(node: Deno.lint.TSEnumDeclaration): void {
						context.report({
							node,
							message: `\`enum\` is not type safe hence forbidden.`
						});
					}
				};
			}
		};
	}
};
