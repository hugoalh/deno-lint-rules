import type { DenoLintRuleDataPre } from "../_template.ts";
export interface DenoLintRuleNoImportNPMOptions {
	/**
	 * Whether to forbid import NPM module via protocol `npm:`.
	 * @default {true}
	 */
	viaProtocol?: boolean;
	/**
	 * Whether to forbid import NPM module via URL.
	 * @default {true}
	 */
	viaURL?: boolean;
}
const regexpNPMURLs: readonly RegExp[] = [
	/^https?:\/\/(?:dev\.|ga\.)?jspm\.io\/npm:/,
	/^https?:\/\/(?:cdn\.)?(?:pika|skypack)\.dev/,
	/^https?:\/\/esm\.sh\/(?!jsr\/|gh\/|pr\/|pkg\.pr\.new\/)/,
	/^https?:\/\/unpkg\.com\//,
	/^https?:\/\/cdn\.jsdelivr\.net\/npm\//,
	/^https?:\/\/esm\.run\//
];
function isNPMURL(item: string): boolean {
	return regexpNPMURLs.some((regexpNPMURL: RegExp): boolean => {
		return regexpNPMURL.test(item);
	});
}
const ruleMessageProtocol = `Import NPM module via protocol \`npm:\` is forbidden.`;
const ruleMessageURL = `Import NPM module via URL is forbidden.`;
export const data: DenoLintRuleDataPre<DenoLintRuleNoImportNPMOptions> = {
	identifier: "no-import-npm",
	context(options: DenoLintRuleNoImportNPMOptions = {}): Deno.lint.Rule {
		const {
			viaProtocol = true,
			viaURL = true
		}: DenoLintRuleNoImportNPMOptions = options;
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ExportAllDeclaration(node: Deno.lint.ExportAllDeclaration): void {
						if (viaProtocol && node.source.value.startsWith("npm:")) {
							context.report({
								node: node.source,
								message: ruleMessageProtocol
							});
						}
						if (viaURL && isNPMURL(node.source.value)) {
							context.report({
								node: node.source,
								message: ruleMessageURL
							});
						}
					},
					ExportNamedDeclaration(node: Deno.lint.ExportNamedDeclaration): void {
						if (node.source !== null) {
							if (viaProtocol && node.source.value.startsWith("npm:")) {
								context.report({
									node: node.source,
									message: ruleMessageProtocol
								});
							}
							if (viaURL && isNPMURL(node.source.value)) {
								context.report({
									node: node.source,
									message: ruleMessageURL
								});
							}
						}
					},
					ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
						if (viaProtocol && node.source.value.startsWith("npm:")) {
							context.report({
								node: node.source,
								message: ruleMessageProtocol
							});
						}
						if (viaURL && isNPMURL(node.source.value)) {
							context.report({
								node: node.source,
								message: ruleMessageURL
							});
						}
					},
					ImportExpression(node: Deno.lint.ImportExpression): void {
						if (node.source.type === "Literal" && typeof node.source.value === "string") {
							if (viaProtocol && node.source.value.startsWith("npm:")) {
								context.report({
									node: node.source,
									message: ruleMessageProtocol
								});
							}
							if (viaURL && isNPMURL(node.source.value)) {
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
