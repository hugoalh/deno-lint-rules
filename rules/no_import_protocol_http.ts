const lineRuleMessage = `Import module with protocol \`http\` is not secure.`;
export default {
	name: "hugoalh",
	rules: {
		"no-import-protocol-http": {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ExportAllDeclaration(node: Deno.lint.ExportAllDeclaration): void {
						if (node.source.value.startsWith("http:")) {
							const urlOriginal: string = node.source.value;
							const urlNew: string = urlOriginal.replace("http:", "https:");
							context.report({
								range: node.source.range,
								message: lineRuleMessage,
								hint: `Do you mean to import \`${urlNew}\`?`,
								fix(fixer: Deno.lint.Fixer): Deno.lint.FixData {
									return fixer.replaceText(node.source, node.source.raw.replace(urlOriginal, urlNew));
								}
							});
						}
					},
					ExportNamedDeclaration(node: Deno.lint.ExportNamedDeclaration): void {
						if (node.source !== null && node.source.value.startsWith("http:")) {
							const urlOriginal: string = node.source.value;
							const urlNew: string = urlOriginal.replace("http:", "https:");
							context.report({
								range: node.source.range,
								message: lineRuleMessage,
								hint: `Do you mean to import \`${urlNew}\`?`,
								fix(fixer: Deno.lint.Fixer): Deno.lint.FixData {
									return fixer.replaceText(node.source!, node.source!.raw.replace(urlOriginal, urlNew));
								}
							});
						}
					},
					ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
						if (node.source.value.startsWith("http:")) {
							const urlOriginal: string = node.source.value;
							const urlNew: string = urlOriginal.replace("http:", "https:");
							context.report({
								range: node.source.range,
								message: lineRuleMessage,
								hint: `Do you mean to import \`${urlNew}\`?`,
								fix(fixer: Deno.lint.Fixer): Deno.lint.FixData {
									return fixer.replaceText(node.source, node.source.raw.replace(urlOriginal, urlNew));
								}
							});
						}
					},
					ImportExpression(node: Deno.lint.ImportExpression): void {
						if (node.source.type === "Literal" && typeof node.source.value === "string" && node.source.value.startsWith("http:")) {
							const urlOriginal: string = node.source.value;
							const urlNew: string = urlOriginal.replace("http:", "https:");
							context.report({
								range: node.source.range,
								message: lineRuleMessage,
								hint: `Do you mean to import \`${urlNew}\`?`
							});
						}
					}
				};
			}
		}
	}
} satisfies Deno.lint.Plugin;
