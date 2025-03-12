import { dirname as getPathDirname } from "jsr:@std/path@^1.0.8/dirname";
import { fromFileUrl as getPathFromFileUrl } from "jsr:@std/path@^1.0.8/from-file-url";
import { relative as getPathRelative } from "jsr:@std/path@^1.0.8/relative";
import type { DenoLintRuleDataPre } from "../_template.ts";
import { isStringLiteral } from "../_utility.ts";
function ruleAssertor(context: Deno.lint.RuleContext, source: Deno.lint.StringLiteral): void {
	if (source.value.startsWith("file:")) {
		const report: Deno.lint.ReportData = {
			node: source,
			message: `Import module via protocol \`file:\` is unnecessary.`
		};
		//deno-lint-ignore hugoalh/no-useless-try
		try {
			let sourceFmt: string = getPathRelative(getPathDirname(context.filename), getPathFromFileUrl(source.value)).replaceAll("\\", "/");
			if (!(
				sourceFmt.startsWith("./") ||
				sourceFmt.startsWith("../")
			)) {
				sourceFmt = `./${sourceFmt}`;
			}
			report.hint = `Do you mean to import \`${sourceFmt}\`?`;
			report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix => {
				return fixer.replaceText(source, source.raw.replace(source.value, sourceFmt));
			};
		}
		//deno-lint-ignore no-empty -- Continue on error.
		catch { }
		context.report(report);
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
				if (isStringLiteral(node.source)) {
					ruleAssertor(context, node.source);
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
