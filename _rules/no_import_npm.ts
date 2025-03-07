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
const regexpNPMURLESMRun = /^https?:\/\/esm\.run\//;
const regexpNPMURLESMsh = /^https?:\/\/esm\.sh\/(?!jsr\/|gh\/|pr\/|pkg\.pr\.new\/)/;
const regexpNPMURLJSDelivr = /^https?:\/\/cdn\.jsdelivr\.net\/npm\//;
const regexpNPMURLJSPM = /^https?:\/\/(?:dev\.|ga\.)?jspm\.io\/npm:/;
const regexpNPMURLPika = /^https?:\/\/cdn\.(?:pika|skypack)\.dev/;
const regexpNPMURLUnpkg = /^https?:\/\/unpkg\.com\//;
function resolveNPMImportFromURL(item: string): boolean | string {
	if (
		regexpNPMURLESMRun.test(item) ||
		regexpNPMURLESMsh.test(item) ||
		regexpNPMURLPika.test(item) ||
		regexpNPMURLUnpkg.test(item)
	) {
		try {
			return `npm:${new URL(item).pathname.slice(1)}`;
		} catch {
			return true;
		}
	}
	if (regexpNPMURLJSDelivr.test(item)) {
		try {
			return `npm:${new URL(item).pathname.slice(5)}`;
		} catch {
			return true;
		}
	}
	if (regexpNPMURLJSPM.test(item)) {
		try {
			return new URL(item).pathname.slice(1).replace(/\/$/, "");
		} catch {
			return true;
		}
	}
	return false;
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
						if (viaURL) {
							const result: boolean | string = resolveNPMImportFromURL(node.source.value);
							if (
								(typeof result === "boolean" && result) ||
								typeof result === "string"
							) {
								context.report({
									node: node.source,
									message: ruleMessageURL,
									hint: (typeof result === "string" && !viaProtocol) ? `Do you mean to import \`${result}\`?` : undefined,
									fix: (typeof result === "string" && !viaProtocol) ? ((fixer: Deno.lint.Fixer): Deno.lint.Fix => {
										return fixer.replaceText(node.source, node.source.raw.replace(node.source.value, result));
									}) : undefined
								});
							}
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
							if (viaURL) {
								const result: boolean | string = resolveNPMImportFromURL(node.source.value);
								if (
									(typeof result === "boolean" && result) ||
									typeof result === "string"
								) {
									context.report({
										node: node.source,
										message: ruleMessageURL,
										hint: (typeof result === "string" && !viaProtocol) ? `Do you mean to import \`${result}\`?` : undefined,
										fix: (typeof result === "string" && !viaProtocol) ? ((fixer: Deno.lint.Fixer): Deno.lint.Fix => {
											return fixer.replaceText(node.source!, node.source!.raw.replace(node.source!.value, result));
										}) : undefined
									});
								}
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
						if (viaURL) {
							const result: boolean | string = resolveNPMImportFromURL(node.source.value);
							if (
								(typeof result === "boolean" && result) ||
								typeof result === "string"
							) {
								context.report({
									node: node.source,
									message: ruleMessageURL,
									hint: (typeof result === "string" && !viaProtocol) ? `Do you mean to import \`${result}\`?` : undefined,
									fix: (typeof result === "string" && !viaProtocol) ? ((fixer: Deno.lint.Fixer): Deno.lint.Fix => {
										return fixer.replaceText(node.source, node.source.raw.replace(node.source.value, result));
									}) : undefined
								});
							}
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
							if (viaURL) {
								const result: boolean | string = resolveNPMImportFromURL(node.source.value);
								if (
									(typeof result === "boolean" && result) ||
									typeof result === "string"
								) {
									context.report({
										node: node.source,
										message: ruleMessageURL,
										hint: (typeof result === "string" && !viaProtocol) ? `Do you mean to import \`${result}\`?` : undefined,
										fix: (typeof result === "string" && !viaProtocol) ? ((fixer: Deno.lint.Fixer): Deno.lint.Fix => {
											return fixer.replaceText(node.source, (node.source as Deno.lint.StringLiteral).raw.replace((node.source as Deno.lint.StringLiteral).value, result));
										}) : undefined
									});
								}
							}
						}
					}
				};
			}
		};
	}
};
