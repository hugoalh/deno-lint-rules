const lineRuleMessage = `Protocol \`bun\` is not available in Deno and NodeJS.`;
export default {
	name: "hugoalh",
	rules: {
		"no-import-protocol-bun": {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					/*
					ExportAllDeclaration(node: Deno.lint.ExportAllDeclaration): void {
						if (node.source.value.startsWith("bun:")) {
							context.report({
								range: node.source.range,
								message: lineRuleMessage
							});
						}
					},
					ExportNamedDeclaration(node: Deno.lint.ExportNamedDeclaration): void {
						if (node.source !== null && node.source.value.startsWith("bun:")) {
							context.report({
								range: node.source.range,
								message: lineRuleMessage
							});
						}
					},
					*/
					ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
						if (node.source.value.startsWith("bun:")) {
							context.report({
								range: node.source.range,
								message: lineRuleMessage
							});
						}
					},
					ImportExpression(node: Deno.lint.ImportExpression): void {
						if (node.source.type === "Literal" && typeof node.source.value === "string" && node.source.value.startsWith("bun:")) {
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
