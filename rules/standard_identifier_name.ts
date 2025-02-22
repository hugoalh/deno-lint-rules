import { isStringASCIIPrintable } from "https://raw.githubusercontent.com/hugoalh/is-string-ascii-es/v1.1.4/printable.ts";
import {
	constructDenoLintPlugin,
	type DenoLintRulePre
} from "../_utility.ts";
export const data: DenoLintRulePre = {
	identifier: "standard-identifier-name",
	recommended: true,
	context(): Deno.lint.Rule {
		return {
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
		};
	}
};
export default constructDenoLintPlugin([{
	...data,
	context: data.context()
}]) satisfies Deno.lint.Plugin as Deno.lint.Plugin;
