import type { DenoLintRuleDataPre } from "../_template.ts";
function ruleAssertor(context: Deno.lint.RuleContext, source: Deno.lint.StringLiteral): void {
	if (source.value.startsWith("http:")) {
		const sourceFmt: string = source.value.replace("http:", "https:");
		context.report({
			node: source,
			message: `Import module via protocol \`http:\` is not secure.`,
			hint: `Do you mean to import \`${sourceFmt}\`?`,
			fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
				return fixer.replaceText(source, source.raw.replace(source.value, sourceFmt));
			}
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
	identifier: "no-import-http",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
