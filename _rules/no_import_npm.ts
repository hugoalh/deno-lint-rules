import {
	isNodeStringLiteral,
	type RuleData
} from "../_utility.ts";
export interface RuleNoImportNPMOptions {
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
function resolveNPMImportFromURL(item: string): string | undefined {
	const sourceURL: URL | null = URL.parse(item);
	if (sourceURL !== null && (
		sourceURL.protocol === "http:" ||
		sourceURL.protocol === "https:"
	)) {
		if (
			((
				sourceURL.hostname === "cdn.pika.dev" ||
				sourceURL.hostname === "cdn.skypack.dev" ||
				sourceURL.hostname === "esm.run" ||
				sourceURL.hostname === "unpkg.com"
			) && sourceURL.pathname.length > 1) ||
			(sourceURL.hostname === "esm.sh" && sourceURL.pathname.length > 1 && !sourceURL.pathname.startsWith("/jsr/") && !sourceURL.pathname.startsWith("/gh/") && !sourceURL.pathname.startsWith("/pr/") && !sourceURL.pathname.startsWith("/pkg.pr.new/"))
		) {
			return `npm:${sourceURL.pathname.slice(1)}`;
		}
		if (sourceURL.hostname === "cdn.jsdelivr.net" && sourceURL.pathname.startsWith("/npm/")) {
			return `npm:${sourceURL.pathname.slice(5)}`;
		}
		if ((
			sourceURL.hostname === "jspm.io" ||
			sourceURL.hostname === "dev.jspm.io" ||
			sourceURL.hostname === "ga.jspm.io"
		) && sourceURL.pathname.startsWith("/npm:")) {
			return sourceURL.pathname.slice(1).replace(/\/$/, "");
		}
	}
}
function ruleAssertor(context: Deno.lint.RuleContext, options: Required<RuleNoImportNPMOptions>, source: Deno.lint.StringLiteral): void {
	const {
		viaProtocol,
		viaURL
	}: Required<RuleNoImportNPMOptions> = options;
	if (viaProtocol && source.value.startsWith("npm:")) {
		context.report({
			node: source,
			message: `Import NPM module via protocol \`npm:\` is forbidden.`
		});
	}
	if (viaURL) {
		const result: string | undefined = resolveNPMImportFromURL(source.value);
		if (typeof result !== "undefined") {
			const report: Deno.lint.ReportData = {
				node: source,
				message: `Import NPM module via URL is forbidden.`
			};
			if (!viaProtocol) {
				report.hint = `Do you mean to import \`${result}\`?`;
				report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
					return fixer.replaceText(source, source.raw.replace(source.value, result));
				};
			}
			context.report(report);
		}
	}
}
export const ruleData: RuleData<RuleNoImportNPMOptions> = {
	identifier: "no-import-npm",
	context(options: RuleNoImportNPMOptions = {}): Deno.lint.Rule {
		const {
			viaProtocol = true,
			viaURL = true
		}: RuleNoImportNPMOptions = options;
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
						if (isNodeStringLiteral(node.source)) {
							ruleAssertorBind(node.source);
						}
					}
				};
			}
		};
	}
};
