export default {
	name: "hugoalh",
	rules: {
		"no-import-protocol-node": {
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
						) && node.source.value.startsWith("node:")) {
							context.report({
								range: node.source.range,
								message: `Import module with protocol \`node\` is forbidden.`
							});
						}
					}
				};
			}
		}
	}
} satisfies Deno.lint.Plugin;
