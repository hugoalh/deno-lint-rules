import type { RuleConstructContext } from "../_utility.ts";
export default {
	identifier: "no-enum",
	tags: [
		"no-typescript-inject-feature",
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					TSEnumDeclaration(node: Deno.lint.TSEnumDeclaration): void {
						context.report({
							node,
							message: `Use of \`enum\` is forbidden.`
						});
					}
				};
			}
		};
	}
} satisfies RuleConstructContext;
