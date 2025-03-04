import type { DenoLintRuleDataPre } from "../_template.ts";
export interface DenoLintRuleNoImportJSROptions {
	/**
	 * Whether to forbid import JSR module via protocol `jsr:`.
	 * @default {false}
	 */
	viaProtocol?: boolean;
	/**
	 * Whether to forbid import JSR module via URL.
	 * @default {true}
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
export const data: DenoLintRuleDataPre<DenoLintRuleNoImportJSROptions> = {
	identifier: "no-import-jsr",
	recommended: true,
	context(options: DenoLintRuleNoImportJSROptions = {}): Deno.lint.Rule {
		const {
			viaProtocol = false,
			viaURL = true
		}: DenoLintRuleNoImportJSROptions = options;
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ExportAllDeclaration(node: Deno.lint.ExportAllDeclaration): void {
						if (viaProtocol && node.source.value.startsWith("jsr:")) {
							context.report({
								node: node.source,
								message: ruleMessageProtocol
							});
						}
						if (viaURL && isJSRURL(node.source.value)) {
							context.report({
								node: node.source,
								message: ruleMessageURL
							});
						}
					},
					ExportNamedDeclaration(node: Deno.lint.ExportNamedDeclaration): void {
						if (node.source !== null) {
							if (viaProtocol && node.source.value.startsWith("jsr:")) {
								context.report({
									node: node.source,
									message: ruleMessageProtocol
								});
							}
							if (viaURL && isJSRURL(node.source.value)) {
								context.report({
									node: node.source,
									message: ruleMessageURL
								});
							}
						}
					},
					ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
						if (viaProtocol && node.source.value.startsWith("jsr:")) {
							context.report({
								node: node.source,
								message: ruleMessageProtocol
							});
						}
						if (viaURL && isJSRURL(node.source.value)) {
							context.report({
								node: node.source,
								message: ruleMessageURL
							});
						}
					},
					ImportExpression(node: Deno.lint.ImportExpression): void {
						if (node.source.type === "Literal" && typeof node.source.value === "string") {
							if (viaProtocol && node.source.value.startsWith("jsr:")) {
								context.report({
									node: node.source,
									message: ruleMessageProtocol
								});
							}
							if (viaURL && isJSRURL(node.source.value)) {
								context.report({
									node: node.source,
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
