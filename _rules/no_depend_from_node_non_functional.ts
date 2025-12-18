import {
	constructVisitorDependFrom,
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
		const message: string | null = Object.entries(modulesNonFunctional).find(([name]: [string, string]): boolean => {
			return (
				name === source.value ||
				name.startsWith(`${source.value}/`)
			);
		})?.[1] ?? null;
		if (message !== null) {
			context.report({
				node: source,
				message
			});
		}
	}
}
export const ruleData: RuleData = {
	identifier: "no-depend-from-node-non-functional",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return constructVisitorDependFrom(ruleAssertor.bind(null, context));
			}
		};
	}
};
