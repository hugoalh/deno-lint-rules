import { dirname as getPathDirname } from "jsr:@std/path@^1.0.8/dirname";
import { basename as getPathBasename } from "jsr:@std/path@^1.0.8/basename";
import { resolve as resolvePath } from "jsr:@std/path@^1.0.8/resolve";
import type { DenoLintRuleDataPre } from "../_template.ts";
import { isStringLiteral } from "../_utility.ts";
function ruleAssertor(context: Deno.lint.RuleContext, source: Deno.lint.StringLiteral): void {
	if (
		source.value === `./${getPathBasename(context.filename)}` ||
		context.filename === resolvePath(getPathDirname(context.filename), source.value)
	) {
		context.report({
			node: source,
			message: `Import self as module is forbidden.`
		});
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
