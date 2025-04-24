import {
	isStringLiteral,
	type DenoLintRuleData
} from "../_utility.ts";
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
function ruleAssertor(context: Deno.lint.RuleContext, options: Required<DenoLintRuleNoImportNPMOptions>, source: Deno.lint.StringLiteral): void {
	const {
		viaProtocol,
		viaURL
	}: Required<DenoLintRuleNoImportNPMOptions> = options;
	if (viaProtocol && source.value.startsWith("npm:")) {
		context.report({
			node: source,
			message: `Import NPM module via protocol \`npm:\` is forbidden.`
		});
	}
	if (viaURL) {
		const result: boolean | string = resolveNPMImportFromURL(source.value);
		if (
			(typeof result === "boolean" && result) ||
			typeof result === "string"
		) {
			const report: Deno.lint.ReportData = {
				node: source,
				message: `Import NPM module via URL is forbidden.`
			};
			if (typeof result === "string" && !viaProtocol) {
				report.hint = `Do you mean to import \`${result}\`?`;
				report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
					return fixer.replaceText(source, source.raw.replace(source.value, result));
				};
			}
			context.report(report);
		}
	}
}
export const ruleData: DenoLintRuleData<DenoLintRuleNoImportNPMOptions> = {
	identifier: "no-import-npm",
	context(options: DenoLintRuleNoImportNPMOptions = {}): Deno.lint.Rule {
		const {
			viaProtocol = true,
			viaURL = true
		}: DenoLintRuleNoImportNPMOptions = options;
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				const ruleAssertorBind = ruleAssertor.bind(null, context, {
					viaProtocol,
					viaURL
				});
				return {
					ExportAllDeclaration(node: Deno.lint.ExportAllDeclaration): void {
						ruleAssertorBind(node.source);
					},
					ExportNamedDeclaration(node: Deno.lint.ExportNamedDeclaration): void {
						if (node.source !== null) {
							ruleAssertorBind(node.source);
						}
					},
					ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
						ruleAssertorBind(node.source);
					},
					ImportExpression(node: Deno.lint.ImportExpression): void {
						if (isStringLiteral(node.source)) {
							ruleAssertorBind(node.source);
						}
					}
				};
			}
		};
	}
};
