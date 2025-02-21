const lintRuleMessage = `Deno Standard Library (std) is moved from Deno Land Module Registry to JSR.`;
const regexpStdDLMR = /^https:\/\/(?:www\.)?deno\.land(?:\/x)?\/std/;
export default {
	name: "hugoalh",
	rules: {
		"std-on-jsr": {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ExportAllDeclaration(node: Deno.lint.ExportAllDeclaration): void {
						if (regexpStdDLMR.test(node.source.value)) {
							context.report({
								range: node.source.range,
								message: lintRuleMessage
							});
						}
					},
					ExportNamedDeclaration(node: Deno.lint.ExportNamedDeclaration): void {
						if (node.source !== null && regexpStdDLMR.test(node.source.value)) {
							context.report({
								range: node.source.range,
								message: lintRuleMessage
							});
						}
					},
					ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
						if (regexpStdDLMR.test(node.source.value)) {
							context.report({
								range: node.source.range,
								message: lintRuleMessage
							});
						}
					},
					ImportExpression(node: Deno.lint.ImportExpression): void {
						if (node.source.type === "Literal" && typeof node.source.value === "string" && regexpStdDLMR.test(node.source.value)) {
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
} satisfies Deno.lint.Plugin;
