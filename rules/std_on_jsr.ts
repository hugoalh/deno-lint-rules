import type { DenoLintRuleDataPre } from "../_template.ts";
const regexpStdDLMR = /^https?:\/\/(?:www\.)?deno\.land(?:\/x)?\/std/;
const ruleMessage = `Deno Standard Library (std) is moved from Deno Land Module Registry to JSR.`;
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			ExportAllDeclaration(node: Deno.lint.ExportAllDeclaration): void {
				if (regexpStdDLMR.test(node.source.value)) {
					context.report({
						node: node.source,
						message: ruleMessage
					});
				}
			},
			ExportNamedDeclaration(node: Deno.lint.ExportNamedDeclaration): void {
				if (node.source !== null && regexpStdDLMR.test(node.source.value)) {
					context.report({
						node: node.source,
						message: ruleMessage
					});
				}
			},
			ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
				if (regexpStdDLMR.test(node.source.value)) {
					context.report({
						node: node.source,
						message: ruleMessage
					});
				}
			},
			ImportExpression(node: Deno.lint.ImportExpression): void {
				if (node.source.type === "Literal" && typeof node.source.value === "string" && regexpStdDLMR.test(node.source.value)) {
					context.report({
						node: node.source,
						message: ruleMessage
					});
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "std-on-jsr",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContextStatic;
	}
};
