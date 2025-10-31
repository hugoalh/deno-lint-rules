import {
	isNodeStringLiteral,
	type RuleData
} from "../_utility.ts";
const modulesNonFunctional: Record<string, string> = {
	"node:cluster": `The NodeJS module is non functional in Deno; Use alternative \`node:worker_threads\` instead.`,
	"node:domain": `The NodeJS module is non functional in Deno; Also deprecated in NodeJS.`,
	"node:punycode": `The NodeJS module is deprecated in Deno and NodeJS.`,
	"node:repl": `The NodeJS module is not supported in Deno.`,
	"node:sea": `The NodeJS module is not supported in Deno.`,
	"node:trace_events": `The NodeJS module is non functional in Deno.`,
	"node:wasi": `The NodeJS module is non functional in Deno; Use standard WebAssembly API instead.`
};
function ruleAssertor(context: Deno.lint.RuleContext, source: Deno.lint.StringLiteral): void {
	if (source.value.startsWith("node:")) {
		for (const [
			name,
			message
		] of Object.entries(modulesNonFunctional)) {
			if (
				name === source.value ||
				name.startsWith(`${source.value}/`)
			) {
				context.report({
					node: source,
					message
				});
			}
		}
	}
}
export const ruleData: RuleData = {
	identifier: "no-depend-source-node-non-functional",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
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
						if (isNodeStringLiteral(node.source)) {
							ruleAssertor(context, node.source);
						}
					}
				};
			}
		};
	}
};
