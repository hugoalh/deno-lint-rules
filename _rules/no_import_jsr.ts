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
function ruleAssertor(context: Deno.lint.RuleContext, source: Deno.lint.StringLiteral, options: Required<DenoLintRuleNoImportJSROptions>): void {
	const {
		viaProtocol,
		viaURL
	}: Required<DenoLintRuleNoImportJSROptions> = options;
	if (viaProtocol && source.value.startsWith("jsr:")) {
		context.report({
			node: source,
			message: `Import JSR module via protocol \`jsr:\` is forbidden.`
		});
	}
	if (viaURL && regexpJSRURLs.some((regexpJSRURL: RegExp): boolean => {
		return regexpJSRURL.test(source.value);
	})) {
		context.report({
			node: source,
			message: `Import JSR module via URL is forbidden.`
		});
	}
}
export const data: DenoLintRuleDataPre<DenoLintRuleNoImportJSROptions> = {
	identifier: "no-import-jsr",
	recommended: true,
	context(options: DenoLintRuleNoImportJSROptions = {}): Deno.lint.Rule {
		const {
			viaProtocol = false,
			viaURL = true
		}: DenoLintRuleNoImportJSROptions = options;
		const optionsFmt: Required<DenoLintRuleNoImportJSROptions> = {
			viaProtocol,
			viaURL
		};
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ExportAllDeclaration(node: Deno.lint.ExportAllDeclaration): void {
						ruleAssertor(context, node.source, optionsFmt);
					},
					ExportNamedDeclaration(node: Deno.lint.ExportNamedDeclaration): void {
						if (node.source !== null) {
							ruleAssertor(context, node.source, optionsFmt);
						}
					},
					ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
						ruleAssertor(context, node.source, optionsFmt);
					},
					ImportExpression(node: Deno.lint.ImportExpression): void {
						if (node.source.type === "Literal" && typeof node.source.value === "string") {
							ruleAssertor(context, node.source, optionsFmt);
						}
					}
				};
			}
		};
	}
};
