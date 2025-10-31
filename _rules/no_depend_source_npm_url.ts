import {
	isNodeStringLiteral,
	type RuleData
} from "../_utility.ts";
function ruleAssertor(context: Deno.lint.RuleContext, source: Deno.lint.StringLiteral): void {
	const sourceURL: URL | null = URL.parse(source.value);
	if (
		sourceURL !== null && (
			sourceURL.protocol === "http:" ||
			sourceURL.protocol === "https:"
		) && (
			((
				sourceURL.hostname === "cdn.pika.dev" ||
				sourceURL.hostname === "cdn.skypack.dev" ||
				sourceURL.hostname === "esm.run" ||
				sourceURL.hostname === "unpkg.com"
			) && sourceURL.pathname.length > 1) ||
			(sourceURL.hostname === "esm.sh" && sourceURL.pathname.length > 1 && !sourceURL.pathname.startsWith("/jsr/") && !sourceURL.pathname.startsWith("/gh/") && !sourceURL.pathname.startsWith("/pr/") && !sourceURL.pathname.startsWith("/pkg.pr.new/")) ||
			(sourceURL.hostname === "cdn.jsdelivr.net" && sourceURL.pathname.startsWith("/npm/")) ||
			((
				sourceURL.hostname === "jspm.io" ||
				sourceURL.hostname === "dev.jspm.io" ||
				sourceURL.hostname === "ga.jspm.io"
			) && sourceURL.pathname.startsWith("/npm:"))
		)
	) {
		context.report({
			node: source,
			message: `Depend module from NPM via URL is forbidden.`
		});
	}
}
export const ruleData: RuleData = {
	identifier: "no-depend-source-npm-url",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ExportAllDeclaration(node: Deno.lint.ExportAllDeclaration): void {
						ruleAssertor(context, node.source);
					},
					ExportNamedDeclaration(node: Deno.lint.ExportNamedDeclaration): void {
						if (node.source !== null) {
							ruleAssertor(context, node.source);
						}
					},
					ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
						ruleAssertor(context, node.source);
					},
					ImportExpression(node: Deno.lint.ImportExpression): void {
						if (isNodeStringLiteral(node.source)) {
							ruleAssertor(context, node.source);
						}
					}
				};
			}
		};
	}
};
