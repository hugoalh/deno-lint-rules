import type { DenoLintRuleDataPre } from "../_utility.ts";
export interface DenoLintRuleImportJSROptions {
	/**
	 * Whether to permit import JSR module via protocol `jsr:`.
	 * @default {true}
	 */
	viaProtocol?: boolean;
	/**
	 * Whether to permit import JSR module via URL.
	 * @default {false}
	 */
	viaURL?: boolean;
}
const regexpJSRURLs: readonly RegExp[] = [
	/^https?:\/\/jsr\.io\/@/,
	/^https?:\/\/esm\.sh\/jsr\/@/
];
function isJSRURL(item: string): boolean {
	return regexpJSRURLs.some((regexpJSRURL: RegExp): boolean => {
		return regexpJSRURL.test(item);
	});
}
const ruleMessageProtocol = `Import JSR module via protocol \`jsr:\` is forbidden.`;
const ruleMessageURL = `Import JSR module via URL is forbidden.`;
export const data: DenoLintRuleDataPre<DenoLintRuleImportJSROptions> = {
	identifier: "import-jsr",
	recommended: true,
	context(options: DenoLintRuleImportJSROptions = {}): Deno.lint.Rule {
		const {
			viaProtocol = true,
			viaURL = false
		}: DenoLintRuleImportJSROptions = options;
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ExportAllDeclaration(node: Deno.lint.ExportAllDeclaration): void {
						if (!viaProtocol && node.source.value.startsWith("jsr:")) {
							context.report({
								range: node.source.range,
								message: ruleMessageProtocol
							});
						}
						if (!viaURL && isJSRURL(node.source.value)) {
							context.report({
								range: node.source.range,
								message: ruleMessageURL
							});
						}
					},
					ExportNamedDeclaration(node: Deno.lint.ExportNamedDeclaration): void {
						if (node.source !== null) {
							if (!viaProtocol && node.source.value.startsWith("jsr:")) {
								context.report({
									range: node.source.range,
									message: ruleMessageProtocol
								});
							}
							if (!viaURL && isJSRURL(node.source.value)) {
								context.report({
									range: node.source.range,
									message: ruleMessageURL
								});
							}
						}
					},
					ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
						if (!viaProtocol && node.source.value.startsWith("jsr:")) {
							context.report({
								range: node.source.range,
								message: ruleMessageProtocol
							});
						}
						if (!viaURL && isJSRURL(node.source.value)) {
							context.report({
								range: node.source.range,
								message: ruleMessageURL
							});
						}
					},
					ImportExpression(node: Deno.lint.ImportExpression): void {
						if (node.source.type === "Literal" && typeof node.source.value === "string") {
							if (!viaProtocol && node.source.value.startsWith("jsr:")) {
								context.report({
									range: node.source.range,
									message: ruleMessageProtocol
								});
							}
							if (!viaURL && isJSRURL(node.source.value)) {
								context.report({
									range: node.source.range,
									message: ruleMessageURL
								});
							}
						}
					}
				};
			}
		};
	}
};
