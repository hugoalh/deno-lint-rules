const lintRuleMessage = `Import module with protocol \`file\` is unnecessary.`;
export default {
	name: "hugoalh",
	rules: {
		"no-import-protocol-file": {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ExportAllDeclaration(node: Deno.lint.ExportAllDeclaration): void {
						if (node.source.value.startsWith("file:")) {
							context.report({
								range: node.source.range,
								message: lintRuleMessage
							});
						}
					},
					ExportNamedDeclaration(node: Deno.lint.ExportNamedDeclaration): void {
						if (node.source !== null && node.source.value.startsWith("file:")) {
							context.report({
								range: node.source.range,
								message: lintRuleMessage
							});
						}
					},
					ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
						if (node.source.value.startsWith("file:")) {
							context.report({
								range: node.source.range,
								message: lintRuleMessage
							});
						}
					},
					ImportExpression(node: Deno.lint.ImportExpression): void {
						if (node.source.type === "Literal" && typeof node.source.value === "string" && node.source.value.startsWith("file:")) {
							context.report({
								range: node.source.range,
								message: lintRuleMessage
							});
						}
					}
				};
			}
		}
	}
} satisfies Deno.lint.Plugin as Deno.lint.Plugin;
