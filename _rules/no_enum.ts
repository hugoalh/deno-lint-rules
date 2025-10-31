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
							message: `Use of \`enum\` is forbidden; Not type safe.`
						});
					}
				};
			}
		};
	}
};
