import type { DenoLintRuleDataPre } from "../_template.ts";
function convertImportURL(item: string): string {
	return item.replace("http:", "https:");
}
const ruleMessage = `Import module via protocol \`http:\` is not secure.`;
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			ExportAllDeclaration(node: Deno.lint.ExportAllDeclaration): void {
				if (node.source.value.startsWith("http:")) {
					const urlExpect: string = convertImportURL(node.source.value);
					context.report({
						node: node.source,
						message: ruleMessage,
						hint: `Do you mean to import \`${urlExpect}\`?`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
							return fixer.replaceText(node.source, node.source.raw.replace(node.source.value, urlExpect));
						}
					});
				}
			},
			ExportNamedDeclaration(node: Deno.lint.ExportNamedDeclaration): void {
				if (node.source !== null && node.source.value.startsWith("http:")) {
					const urlExpect: string = convertImportURL(node.source.value);
					context.report({
						node: node.source,
						message: ruleMessage,
						hint: `Do you mean to import \`${urlExpect}\`?`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
							return fixer.replaceText(node.source!, node.source!.raw.replace((node.source as Deno.lint.StringLiteral).value, urlExpect));
						}
					});
				}
			},
			ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
				if (node.source.value.startsWith("http:")) {
					const urlExpect: string = convertImportURL(node.source.value);
					context.report({
						node: node.source,
						message: ruleMessage,
						hint: `Do you mean to import \`${urlExpect}\`?`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
							return fixer.replaceText(node.source, node.source.raw.replace(node.source.value, urlExpect));
						}
					});
				}
			},
			ImportExpression(node: Deno.lint.ImportExpression): void {
				if (node.source.type === "Literal" && typeof node.source.value === "string" && node.source.value.startsWith("http:")) {
					const urlExpect: string = convertImportURL(node.source.value);
					context.report({
						node: node.source,
						message: ruleMessage,
						hint: `Do you mean to import \`${urlExpect}\`?`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
							return fixer.replaceText(node.source, (node.source as Deno.lint.StringLiteral).raw.replace((node.source as Deno.lint.StringLiteral).value, urlExpect));
						}
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
