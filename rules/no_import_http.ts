import type { DenoLintRuleDataPre } from "../_utility.ts";
const ruleMessage = `Import module via protocol \`http:\` is not secure.`;
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			ExportAllDeclaration(node: Deno.lint.ExportAllDeclaration): void {
				if (node.source.value.startsWith("http:")) {
					const urlCurrent: string = node.source.value;
					const urlExpect: string = urlCurrent.replace("http:", "https:");
					context.report({
						range: node.source.range,
						message: ruleMessage,
						hint: `Do you mean to import \`${urlExpect}\`?`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.FixData {
							return fixer.replaceText(node.source, node.source.raw.replace(urlCurrent, urlExpect));
						}
					});
				}
			},
			ExportNamedDeclaration(node: Deno.lint.ExportNamedDeclaration): void {
				if (node.source !== null && node.source.value.startsWith("http:")) {
					const urlCurrent: string = node.source.value;
					const urlExpect: string = urlCurrent.replace("http:", "https:");
					context.report({
						range: node.source.range,
						message: ruleMessage,
						hint: `Do you mean to import \`${urlExpect}\`?`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.FixData {
							return fixer.replaceText(node.source!, node.source!.raw.replace(urlCurrent, urlExpect));
						}
					});
				}
			},
			ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
				if (node.source.value.startsWith("http:")) {
					const urlCurrent: string = node.source.value;
					const urlExpect: string = urlCurrent.replace("http:", "https:");
					context.report({
						range: node.source.range,
						message: ruleMessage,
						hint: `Do you mean to import \`${urlExpect}\`?`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.FixData {
							return fixer.replaceText(node.source, node.source.raw.replace(urlCurrent, urlExpect));
						}
					});
				}
			},
			ImportExpression(node: Deno.lint.ImportExpression): void {
				if (node.source.type === "Literal" && typeof node.source.value === "string" && node.source.value.startsWith("http:")) {
					const urlCurrent: string = node.source.value;
					const urlExpect: string = urlCurrent.replace("http:", "https:");
					context.report({
						range: node.source.range,
						message: ruleMessage,
						hint: `Do you mean to import \`${urlExpect}\`?`
					});
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-import-http",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContextStatic;
	}
};
