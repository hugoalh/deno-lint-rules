import type { RuleData } from "../_utility.ts";
const regexpImportSource = /^import\s+source\s+.+\s+from/;
export const ruleData: RuleData = {
	identifier: "no-import-source",
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					// NOTE: As of written, there has no direct way to detect whether the import is source import.
					ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
						const raw: string = context.sourceCode.getText(node).replaceAll("\r\n", "\n").replaceAll("\n", " ");
						if (regexpImportSource.test(raw)) {
							context.report({
								node,
								message: `Import file, module, or script as source is forbidden.`
							});
						}
					}
				};
			}
		};
	}
};
