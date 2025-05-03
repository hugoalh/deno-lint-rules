import {
	isNodeStringLiteral,
	type DenoLintRuleData
} from "../_utility.ts";
export interface DenoLintRuleNoImportJSROptions {
	/**
	 * Whether to forbid import JSR module via protocol `jsr:`.
	 * @default {false}
	 */
	viaProtocol?: boolean;
	/**
	 * Whether to forbid import JSR module via URL.
	 * @default {true}
	 */
	viaURL?: boolean;
}
const regexpJSRURLs: readonly RegExp[] = [
	/^https?:\/\/jsr\.io\/@/,
	/^https?:\/\/esm\.sh\/jsr\/@/
];
function ruleAssertor(context: Deno.lint.RuleContext, options: Required<DenoLintRuleNoImportJSROptions>, source: Deno.lint.StringLiteral): void {
	const {
		viaProtocol,
		viaURL
	}: Required<DenoLintRuleNoImportJSROptions> = options;
	if (viaProtocol && source.value.startsWith("jsr:")) {
		context.report({
			node: source,
			message: `Import JSR module via protocol \`jsr:\` is forbidden.`
		});
	}
	if (viaURL && regexpJSRURLs.some((regexpJSRURL: RegExp): boolean => {
		return regexpJSRURL.test(source.value);
	})) {
		context.report({
			node: source,
			message: `Import JSR module via URL is forbidden.`
		});
	}
}
export const ruleData: DenoLintRuleData<DenoLintRuleNoImportJSROptions> = {
	identifier: "no-import-jsr",
	recommended: true,
	context(options: DenoLintRuleNoImportJSROptions = {}): Deno.lint.Rule {
		const {
			viaProtocol = false,
			viaURL = true
		}: DenoLintRuleNoImportJSROptions = options;
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				const ruleAssertorBind = ruleAssertor.bind(null, context, {
					viaProtocol,
					viaURL
				});
				return {
					ExportAllDeclaration(node: Deno.lint.ExportAllDeclaration): void {
						ruleAssertorBind(node.source);
					},
					ExportNamedDeclaration(node: Deno.lint.ExportNamedDeclaration): void {
						if (node.source !== null) {
							ruleAssertorBind(node.source);
						}
					},
					ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
						ruleAssertorBind(node.source);
					},
					ImportExpression(node: Deno.lint.ImportExpression): void {
						if (isNodeStringLiteral(node.source)) {
							ruleAssertorBind(node.source);
						}
					}
				};
			}
		};
	}
};
