import {
	constructDenoLintPlugin,
	type DenoLintRulePre
} from "../_utility.ts";
const ruleMessage = `Import module with protocol \`https\` is forbidden.`;
export const data: DenoLintRulePre = {
	identifier: "no-import-protocol-https",
	recommended: false,
	context(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ExportAllDeclaration(node: Deno.lint.ExportAllDeclaration): void {
						if (node.source.value.startsWith("https:")) {
							context.report({
								range: node.source.range,
								message: ruleMessage
							});
						}
					},
					ExportNamedDeclaration(node: Deno.lint.ExportNamedDeclaration): void {
						if (node.source !== null && node.source.value.startsWith("https:")) {
							context.report({
								range: node.source.range,
								message: ruleMessage
							});
						}
					},
					ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
						if (node.source.value.startsWith("https:")) {
							context.report({
								range: node.source.range,
								message: ruleMessage
							});
						}
					},
					ImportExpression(node: Deno.lint.ImportExpression): void {
						if (node.source.type === "Literal" && typeof node.source.value === "string" && node.source.value.startsWith("https:")) {
							context.report({
								range: node.source.range,
								message: ruleMessage
							});
						}
					}
				};
			}
		};
	}
};
export default constructDenoLintPlugin([{
	...data,
	context: data.context()
}]) satisfies Deno.lint.Plugin as Deno.lint.Plugin;
