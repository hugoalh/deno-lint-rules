import { isStringASCIIPrintable } from "https://raw.githubusercontent.com/hugoalh/is-string-ascii-es/v1.1.5/printable.ts";
import type { RuleConstructContext } from "../_utility.ts";
export default {
	identifier: "ascii-identifier",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Identifier(node: Deno.lint.Identifier): void {
						if (!isStringASCIIPrintable(node.name)) {
							context.report({
								node,
								message: `Require the identifier contain only ASCII characters.`
							});
						}
					}
				};
			}
		};
	}
} satisfies RuleConstructContext;
