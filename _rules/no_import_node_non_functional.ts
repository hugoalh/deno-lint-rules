import {
	isNodeStringLiteral,
	type RuleData
} from "../_utility.ts";
const list: Record<string, string> = {
	"node:cluster": `This is non functional in Deno; Use alternative \`node:worker_threads\` instead.`,
	"node:domain": `This is non functional in Deno; Also deprecated in NodeJS.`,
	"node:punycode": `This is deprecated in Deno and NodeJS.`,
	"node:repl": `This is not supported in Deno.`,
	"node:sea": `This is not supported in Deno.`,
	"node:trace_events": `This is non functional in Deno.`,
	"node:wasi": `This is non functional in Deno; Use standard WebAssembly API instead.`
};
function ruleAssertor(context: Deno.lint.RuleContext, source: Deno.lint.StringLiteral): void {
	if (source.value.startsWith("node:")) {
		for (const [
			key,
			value
		] of Object.entries(list)) {
			if (
				key === source.value ||
				key.startsWith(`${source.value}/`)
			) {
				context.report({
					node: source,
					message: value
				});
			}
		}
	}
}
export const ruleData: RuleData = {
	identifier: "no-import-node-non-functional",
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
