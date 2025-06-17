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
			sourceURL.hostname === "deno.land" ||
			sourceURL.hostname === "www.deno.land"
		) && (
			sourceURL.pathname.startsWith("/std") ||
			sourceURL.pathname.startsWith("/x/std")
		)
	) {
		context.report({
			node: source,
			message: `Deno Standard Library (std) is moved from Deno Land Module Registry to JSR.`
		});
	}
}
const ruleContext: Deno.lint.Rule = {
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
export const ruleData: RuleData = {
	identifier: "std-on-jsr",
	sets: [
		"recommended"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
