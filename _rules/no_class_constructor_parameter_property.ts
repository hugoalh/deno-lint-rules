import type { RuleConstructContext } from "../_utility.ts";
export default {
	identifier: "no-class-constructor-parameter-property",
	tags: [
		"no-typescript-inject-feature"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					TSParameterProperty(node: Deno.lint.TSParameterProperty): void {
						context.report({
							node: node as unknown as Deno.lint.Node,
							message: `Use of class constructor parameter property is forbidden.`
						});
					}
				};
			}
		};
	}
} satisfies RuleConstructContext;
