import { isFileES } from "../_utility/file/es.ts";
export default {
	name: "hugoalh",
	rules: {
		"no-import-protocol-bun": {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
						if (isFileES(context) && node.source.value.startsWith("bun:")) {
							context.report({
								range: node.source.range,
								message: `Protocol \`bun\` is not available in Deno and NodeJS.`
							});
						}
					}
				};
			}
		}
	}
} satisfies Deno.lint.Plugin;
