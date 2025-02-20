export default {
	name: "hugoalh",
	rules: {
		"no-import-protocol-bun": {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
						if ((
							context.filename.endsWith(".js") ||
							context.filename.endsWith(".jsx") ||
							context.filename.endsWith(".mjs") ||
							context.filename.endsWith(".mts") ||
							context.filename.endsWith(".ts") ||
							context.filename.endsWith(".tsx")
						) && node.source.value.startsWith("bun:")) {
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
