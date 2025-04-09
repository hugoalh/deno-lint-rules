import {
	basename as getPathBasename,
	dirname as getPathDirname,
	resolve as resolvePath
} from "node:path";
import {
	fileURLToPath as getPathFromFileUrl,
	pathToFileURL as convertPathToFileUrl
} from "node:url";
import type { DenoLintRuleDataPre } from "../_template.ts";
import { isStringLiteral } from "../_utility.ts";
function isImportFromFileUrlLike(pattern: string, source: string): boolean {
	return (
		source === pattern ||
		(source.startsWith(pattern) && (
			source.charAt(pattern.length) === "#" ||
			source.charAt(pattern.length) === "?"
		))
	);
}
function ruleAssertor(context: Deno.lint.RuleContext, source: Deno.lint.StringLiteral): void {
	//deno-lint-ignore hugoalh/no-useless-try
	try {
		const contextFileUrl: string = convertPathToFileUrl(context.filename).href;
		if (
			isImportFromFileUrlLike(`./${getPathBasename(context.filename)}`, source.value) ||
			(source.value.startsWith(".") && isImportFromFileUrlLike(contextFileUrl, convertPathToFileUrl(resolvePath(getPathDirname(context.filename), source.value)).href)) ||
			(source.value.startsWith("/") && isImportFromFileUrlLike(contextFileUrl, convertPathToFileUrl(resolvePath(source.value)).href)) ||
			(source.value.startsWith("file:") && isImportFromFileUrlLike(contextFileUrl, convertPathToFileUrl(getPathFromFileUrl(source.value)).href))
		) {
			context.report({
				node: source,
				message: `Import self as module is forbidden.`
			});
		}
	}
	//deno-lint-ignore no-empty -- Continue on error.
	catch { }
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
	identifier: "no-import-self",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
