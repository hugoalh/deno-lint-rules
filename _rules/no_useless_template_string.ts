import type { RuleData } from "../_utility.ts";
export interface RuleNoUselessTemplateStringOptions {
	/**
	 * Whether to fix with single quote (`'`) instead of double quote (`"`).
	 * @default {false}
	 */
	fixWithSingleQuote?: boolean;
}
export const ruleData: RuleData = {
	identifier: "no-useless-template-string",
	querier(options: RuleNoUselessTemplateStringOptions = {}): Deno.lint.Rule {
		const { fixWithSingleQuote = false }: RuleNoUselessTemplateStringOptions = options;
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					TemplateLiteral(node: Deno.lint.TemplateLiteral): void {
						const quote: string = fixWithSingleQuote ? "'" : "\"";
						if (node.expressions.length === 0) {
							const report: Deno.lint.ReportData = {
								node,
								message: `Use of template string without any expression is forbidden.`
							};
							const raw: string = context.sourceCode.getText(node).slice(1, -1);
							if (!raw.includes("`") && !raw.includes(quote)) {
								const expect: string = `${quote}${raw}${quote}`;
								report.hint = `Do you mean \`${expect}\`?`;
								report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
									return fixer.replaceText(node, expect);
								};
							}
							context.report(report);
						}
					}
				};
			}
		};
	}
};
