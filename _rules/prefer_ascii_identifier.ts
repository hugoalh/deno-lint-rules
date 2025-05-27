import { isStringASCIIPrintable } from "https://raw.githubusercontent.com/hugoalh/is-string-ascii-es/v1.1.5/printable.ts";
import type { RuleData } from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			Identifier(node: Deno.lint.Identifier): void {
				if (!isStringASCIIPrintable(node.name)) {
					context.report({
						node,
						message: `Prefer the identifier is ASCII characters only.`
					});
				}
			}
		};
	}
};
export const ruleData: RuleData = {
	identifier: "prefer-ascii-identifier",
	sets: [
		"recommended"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
