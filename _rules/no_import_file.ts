import { fileURLToPath as convertFileURLToPath } from "node:url";
import {
	isNodeStringLiteral,
	resolveModuleRelativePath,
	type RuleData
} from "../_utility.ts";
function ruleAssertor(context: Deno.lint.RuleContext, source: Deno.lint.StringLiteral): void {
	if (source.value.startsWith("file:")) {
		const report: Deno.lint.ReportData = {
			node: source,
			message: `Import module via protocol \`file:\` is unnecessary.`
		};
		//deno-lint-ignore hugoalh/no-useless-try
		try {
			const result: string = resolveModuleRelativePath(context.filename, convertFileURLToPath(source.value));
			report.hint = `Do you mean to import \`${result}\`?`;
			report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
				return fixer.replaceText(source, source.raw.replace(source.value, result));
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
				if (isNodeStringLiteral(node.source)) {
					ruleAssertor(context, node.source);
				}
			}
		};
	}
};
export const ruleData: RuleData = {
	identifier: "no-import-file",
	sets: [
		"recommended"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
