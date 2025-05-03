import {
	isNodeStringLiteral,
	resolveModuleRelativePath,
	type DenoLintRuleData
} from "../_utility.ts";
function ruleAssertor(context: Deno.lint.RuleContext, source: Deno.lint.StringLiteral): void {
	if (source.value.startsWith("/")) {
		const report: Deno.lint.ReportData = {
			node: source,
			message: `Import module with absolute path is forbidden.`
		};
		//deno-lint-ignore hugoalh/no-useless-try
		try {
			const result: string = resolveModuleRelativePath(context.filename, source.value);
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
export const ruleData: DenoLintRuleData = {
	identifier: "no-import-absolute",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
