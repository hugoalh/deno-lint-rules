import { isStringASCIIPrintable } from "https://raw.githubusercontent.com/hugoalh/is-string-ascii-es/v1.1.4/printable.ts";
import type { DenoLintRuleData } from "../_utility.ts";
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
export const ruleData: DenoLintRuleData = {
	identifier: "prefer-ascii-identifier",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
