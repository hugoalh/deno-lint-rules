import type { RuleConstructContext } from "../_utility.ts";
export default {
	identifier: "no-type-assertion-angle-bracket",
	tags: [
		"recommended",
		"no-typescript-inject-feature"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					TSTypeAssertion(node: Deno.lint.TSTypeAssertion): void {
						context.report({
							node,
							message: `Type assertion with angle bracket syntax can be confused with React syntax, also unable to use at the React module/script, hence forbidden.`
						});
					}
				};
			}
		};
	}
} satisfies RuleConstructContext as RuleConstructContext;
