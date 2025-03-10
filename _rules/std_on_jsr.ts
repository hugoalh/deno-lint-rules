import type { DenoLintRuleDataPre } from "../_template.ts";
const regexpStdDLMR = /^https?:\/\/(?:www\.)?deno\.land(?:\/x)?\/std/;
function ruleAssertor(context: Deno.lint.RuleContext, source: Deno.lint.StringLiteral): void {
	if (regexpStdDLMR.test(source.value)) {
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
				if (node.source.type === "Literal" && typeof node.source.value === "string") {
					ruleAssertor(context, node.source);
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "std-on-jsr",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
