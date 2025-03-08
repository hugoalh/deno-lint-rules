import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleMessage = `Import module via protocol \`file:\` is unnecessary.`;
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			ExportAllDeclaration(node: Deno.lint.ExportAllDeclaration): void {
				if (node.source.value.startsWith("file:")) {
					context.report({
						node: node.source,
						message: ruleMessage
					});
				}
			},
			ExportNamedDeclaration(node: Deno.lint.ExportNamedDeclaration): void {
				if (node.source !== null && node.source.value.startsWith("file:")) {
					context.report({
						node: node.source,
						message: ruleMessage
					});
				}
			},
			ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
				if (node.source.value.startsWith("file:")) {
					context.report({
						node: node.source,
						message: ruleMessage
					});
				}
			},
			ImportExpression(node: Deno.lint.ImportExpression): void {
				if (node.source.type === "Literal" && typeof node.source.value === "string" && node.source.value.startsWith("file:")) {
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
	identifier: "no-import-file",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContextStatic;
	}
};
