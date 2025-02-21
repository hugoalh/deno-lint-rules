const lineRuleMessage = `Import module with protocol \`jsr\` is forbidden.`;
export default {
	name: "hugoalh",
	rules: {
		"no-import-protocol-jsr": {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
						if (node.source.value.startsWith("jsr:")) {
							context.report({
								range: node.source.range,
								message: lineRuleMessage
							});
						}
					},
					ImportExpression(node: Deno.lint.ImportExpression): void {
						if (node.source.type === "Literal" && typeof node.source.value === "string" && node.source.value.startsWith("jsr:")) {
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
