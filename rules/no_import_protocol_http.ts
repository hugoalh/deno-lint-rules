const lineRuleMessage = `Import module with protocol \`http\` is not secure.`;
export default {
	name: "hugoalh",
	rules: {
		"no-import-protocol-http": {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
						if (node.source.value.startsWith("http:")) {
							context.report({
								range: node.source.range,
								message: lineRuleMessage,
								hint: `Do you mean to import \`${node.source.value.replace("http:", "https:")}\`?`,
								fix(fixer: Deno.lint.Fixer): Deno.lint.FixData {
									return fixer.replaceText(node.source, node.source.raw.replace("http:", "https:"));
								}
							});
						}
					},
					ImportExpression(node: Deno.lint.ImportExpression): void {
						if (node.source.type === "Literal" && typeof node.source.value === "string" && node.source.value.startsWith("http:")) {
							context.report({
								range: node.source.range,
								message: lineRuleMessage,
								hint: `Do you mean to import \`${node.source.value.replace("http:", "https:")}\`?`
							});
						}
					}
				};
			}
		}
	}
} satisfies Deno.lint.Plugin;
