export default {
	name: "hugoalh",
	rules: {
		"no-import-protocol-http": {
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
						) && node.source.value.startsWith("http:")) {
							context.report({
								range: node.source.range,
								message: `Import module with protocol \`http\` is not secure.`,
								hint: `Do you mean to import \`${node.source.value.replace("http:", "https:")}\`?`,
								fix(fixer: Deno.lint.Fixer): Deno.lint.FixData {
									return fixer.replaceText(node.source, node.source.raw.replace("http:", "https:"));
								}
							});
						}
					}
				};
			}
		}
	}
} satisfies Deno.lint.Plugin;
