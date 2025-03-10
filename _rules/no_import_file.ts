import { fromFileUrl as getPathFromFileUrl } from "jsr:@std/path@^1.0.8/from-file-url";
import { relative as getPathRelative } from "jsr:@std/path@^1.0.8/relative";
import type { DenoLintRuleDataPre } from "../_template.ts";
function constructRuleReport(contextFilePath: string, source: Deno.lint.StringLiteral): Deno.lint.ReportData {
	let sourceFmt: string | undefined = undefined;
	try {
		sourceFmt = getPathRelative(contextFilePath, getPathFromFileUrl(source.value));
	}
	//deno-lint-ignore no-empty -- Continue on error.
	catch { }
	return {
		node: source,
		message: `Import module via protocol \`file:\` is unnecessary.`,
		hint: (typeof sourceFmt === "string") ? `Do you mean to import \`${sourceFmt}\`?` : undefined,
		fix: (typeof sourceFmt === "string") ? ((fixer: Deno.lint.Fixer): Deno.lint.Fix => {
			return fixer.replaceText(source, source.raw.replace(source.value, sourceFmt));
		}) : undefined
	};
}
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			ExportAllDeclaration(node: Deno.lint.ExportAllDeclaration): void {
				if (node.source.value.startsWith("file:")) {
					context.report(constructRuleReport(context.filename, node.source));
				}
			},
			ExportNamedDeclaration(node: Deno.lint.ExportNamedDeclaration): void {
				if (node.source !== null && node.source.value.startsWith("file:")) {
					context.report(constructRuleReport(context.filename, node.source));
				}
			},
			ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
				if (node.source.value.startsWith("file:")) {
					context.report(constructRuleReport(context.filename, node.source));
				}
			},
			ImportExpression(node: Deno.lint.ImportExpression): void {
				if (node.source.type === "Literal" && typeof node.source.value === "string" && node.source.value.startsWith("file:")) {
					context.report(constructRuleReport(context.filename, node.source));
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-import-file",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
