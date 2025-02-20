import { isStringASCIIPrintable } from "https://raw.githubusercontent.com/hugoalh/is-string-ascii-es/v1.1.4/printable.ts";
import { isFileES } from "../_utility/file/es.ts";
export default {
	name: "hugoalh",
	rules: {
		"standard-naming": {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Identifier(node: Deno.lint.Identifier): void {
						if (isFileES(context) && !isStringASCIIPrintable(node.name)) {
							context.report({
								range: node.range,
								message: `Non standard naming.`
							});
						}
					}
				};
			}
		}
	}
} satisfies Deno.lint.Plugin;
