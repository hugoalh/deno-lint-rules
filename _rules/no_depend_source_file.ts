import { fileURLToPath as convertFileURLToPath } from "node:url";
import {
	constructVisitorDependSource,
	resolveModuleRelativePath,
	type RuleData
} from "../_utility.ts";
function ruleAssertor(context: Deno.lint.RuleContext, source: Deno.lint.StringLiteral): void {
	if (source.value.startsWith("file:")) {
		const report: Deno.lint.ReportData = {
			node: source,
			message: `Depend module via protocol \`file:\` is unnecessary.`
		};
		try {
			const result: string = resolveModuleRelativePath(context.filename, convertFileURLToPath(source.value));
			report.hint = `Do you mean \`${result}\`?`;
			report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
				return fixer.replaceText(source, source.raw.replace(source.value, result));
			};
		} catch {
			// CONTINUE
		}
		context.report(report);
	}
}
export const ruleData: RuleData = {
	identifier: "no-depend-source-file",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return constructVisitorDependSource(ruleAssertor.bind(null, context));
			}
		};
	}
};
