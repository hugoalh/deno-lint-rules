import type {
	ImportDeclarationPolyfill,
	ImportExpressionPolyfill,
	RuleConstructContext
} from "../_utility.ts";
const regexpImportSource = /^import\s+source\s+.+\s+from/;
const ruleMessage: string = `Import file, module, or script as source is forbidden.`;
export default {
	identifier: "no-import-source",
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					// NOTE: As of written, there has no direct way to detect whether the import is source import.
					ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
						if (typeof (node as ImportDeclarationPolyfill).phase === "undefined") {
							// Parse from raw.
							const raw: string = context.sourceCode.getText(node).replaceAll("\r\n", "\n").replaceAll("\n", " ");
							if (regexpImportSource.test(raw)) {
								context.report({
									node,
									message: ruleMessage
								});
							}
							return;
						}
						if ((node as ImportDeclarationPolyfill).phase === "source") {
							context.report({
								node,
								message: ruleMessage
							});
						}
					},
					ImportExpression(node: Deno.lint.ImportExpression): void {
						// NOTE: Parse from raw is not possible, too complex, hence ignore.
						if (typeof (node as ImportExpressionPolyfill).phase !== "undefined" && (node as ImportExpressionPolyfill).phase === "source") {
							context.report({
								node,
								message: ruleMessage
							});
						}
					}
				};
			}
		};
	}
} satisfies RuleConstructContext as RuleConstructContext;
