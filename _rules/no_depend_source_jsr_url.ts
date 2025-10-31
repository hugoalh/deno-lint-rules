import {
	isNodeStringLiteral,
	type RuleData
} from "../_utility.ts";
function ruleAssertor(context: Deno.lint.RuleContext, source: Deno.lint.StringLiteral): void {
	const sourceURL: URL | null = URL.parse(source.value);
	if (sourceURL !== null &&
		(
			sourceURL.protocol === "http:" ||
			sourceURL.protocol === "https:"
		) && (
			(sourceURL.hostname === "esm.sh" && sourceURL.pathname.startsWith("/jsr/@")) ||
			(sourceURL.hostname === "jsr.io" && sourceURL.pathname.startsWith("/@"))
		)
	) {
		context.report({
			node: source,
			message: `Depend module from JSR via URL is forbidden.`
		});
	}
}
export const ruleData: RuleData = {
	identifier: "no-depend-source-jsr-url",
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
