const lineRuleMessage = `Import module with protocol \`npm\` is forbidden.`;
export default {
	name: "hugoalh",
	rules: {
		"no-import-protocol-npm": {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
						if (node.source.value.startsWith("npm:")) {
							context.report({
								range: node.source.range,
								message: lineRuleMessage
							});
						}
					},
					ImportExpression(node: Deno.lint.ImportExpression): void {
						if (node.source.type === "Literal" && typeof node.source.value === "string" && node.source.value.startsWith("npm:")) {
							context.report({
								range: node.source.range,
								message: lineRuleMessage
							});
						}
					}
				};
			}
		}
	}
} satisfies Deno.lint.Plugin;
