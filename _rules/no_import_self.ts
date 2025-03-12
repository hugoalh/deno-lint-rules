import { basename as getPathBasename } from "jsr:@std/path@^1.0.8/basename";
import { dirname as getPathDirname } from "jsr:@std/path@^1.0.8/dirname";
import { fromFileUrl as getPathFromFileUrl } from "jsr:@std/path@^1.0.8/from-file-url";
import { resolve as resolvePath } from "jsr:@std/path@^1.0.8/resolve";
import { toFileUrl as convertPathToFileUrl } from "jsr:@std/path@^1.0.8/to-file-url";
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
		const contextFileRelative: string = `./${getPathBasename(context.filename)}`;
		const contextFileUrl: string = convertPathToFileUrl(context.filename).href;
		let result: boolean = false;
		if (isImportFromFileUrlLike(contextFileRelative, source.value)) {
			result = true;
		} else if (source.value.startsWith(".")) {
			if (isImportFromFileUrlLike(contextFileUrl, convertPathToFileUrl(resolvePath(getPathDirname(context.filename), source.value)).href)) {
				result = true;
			}
		} else if (source.value.startsWith("/")) {
			if (isImportFromFileUrlLike(contextFileUrl, convertPathToFileUrl(resolvePath(source.value)).href)) {
				result = true;
			}
		} else if (source.value.startsWith("file:")) {
			if (isImportFromFileUrlLike(contextFileUrl, convertPathToFileUrl(getPathFromFileUrl(source.value)).href)) {
				result = true;
			}
		}
		if (result) {
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
