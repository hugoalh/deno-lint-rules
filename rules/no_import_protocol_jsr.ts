import type { DenoLintRuleDataPre } from "../_utility.ts";
const ruleMessage = `Import module with protocol \`jsr\` is forbidden.`;
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			ExportAllDeclaration(node: Deno.lint.ExportAllDeclaration): void {
				if (node.source.value.startsWith("jsr:")) {
					context.report({
						range: node.source.range,
						message: ruleMessage
					});
				}
			},
			ExportNamedDeclaration(node: Deno.lint.ExportNamedDeclaration): void {
				if (node.source !== null && node.source.value.startsWith("jsr:")) {
					context.report({
						range: node.source.range,
						message: ruleMessage
					});
				}
			},
			ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
				if (node.source.value.startsWith("jsr:")) {
					context.report({
						range: node.source.range,
						message: ruleMessage
					});
				}
			},
			ImportExpression(node: Deno.lint.ImportExpression): void {
				if (node.source.type === "Literal" && typeof node.source.value === "string" && node.source.value.startsWith("jsr:")) {
					context.report({
						range: node.source.range,
						message: ruleMessage
					});
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-import-protocol-jsr",
	context(): Deno.lint.Rule {
		return ruleContextStatic;
	}
};
