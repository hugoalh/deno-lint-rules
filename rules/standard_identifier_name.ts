import { isStringASCIIPrintable } from "https://raw.githubusercontent.com/hugoalh/is-string-ascii-es/v1.1.4/printable.ts";
export default {
	name: "hugoalh",
	rules: {
		"standard-identifier-name": {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Identifier(node: Deno.lint.Identifier): void {
						if (!isStringASCIIPrintable(node.name)) {
							context.report({
								range: node.range,
								message: `Non standard identifier name.`
							});
						}
					}
				};
			}
		}
	}
} satisfies Deno.lint.Plugin as Deno.lint.Plugin;
