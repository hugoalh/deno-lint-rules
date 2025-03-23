import type { DenoLintRuleDataPre } from "../_template.ts";
import {
	getContextPosition,
	type ContextPosition
} from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			Program(node: Deno.lint.Program): void {
				let done: boolean = false;
				let last: Deno.lint.ImportDeclaration;
				for (const statement of node.body) {
					if (statement.type === "ImportDeclaration") {
						if (done) {
							const report: Deno.lint.ReportData = {
								node: statement,
								message: `Prefer statements \`import\` at the begin of the file.`
							};
							//deno-lint-ignore hugoalh/no-useless-try
							try {
								const {
									columnBegin,
									columnEnd,
									lineBegin,
									lineEnd
								}: ContextPosition = getContextPosition(context, last!);
								report.hint = `Last valid import declaration locate at range from line ${lineBegin} column ${columnBegin} to line ${lineEnd} column ${columnEnd}.`;
							}
							//deno-lint-ignore no-empty -- Continue on error.
							catch { }
							context.report(report);
						} else {
							last = statement;
						}
					} else {
						done = true;
					}
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "prefer-import-at-begin",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
