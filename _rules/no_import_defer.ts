import type {
	ImportDeclarationPolyfill,
	ImportExpressionPolyfill,
	RuleData
} from "../_utility.ts";
const regexpImportDefer = /^import\s+defer\s+\*\s+as\s+.+\s+from/;
const ruleMessage: string = `Import file, module, or script with defer is forbidden.`;
export const ruleData: RuleData = {
	identifier: "no-import-defer",
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					// NOTE: As of written, there has no direct way to detect whether the import is defer import.
					ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
						if (typeof (node as ImportDeclarationPolyfill).phase === "undefined") {
							// Parse from raw.
							const raw: string = context.sourceCode.getText(node).replaceAll("\r\n", "\n").replaceAll("\n", " ");
							if (regexpImportDefer.test(raw)) {
								context.report({
									node,
									message: ruleMessage
								});
							}
							return;
						}
						if ((node as ImportDeclarationPolyfill).phase === "defer") {
							context.report({
								node,
								message: ruleMessage
							});
						}
					},
					ImportExpression(node: Deno.lint.ImportExpression): void {
						// NOTE: Parse from raw is not possible, too complex, hence ignore.
						if (typeof (node as ImportExpressionPolyfill).phase !== "undefined" && (node as ImportExpressionPolyfill).phase === "defer") {
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
};
