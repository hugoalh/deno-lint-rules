import {
	constructVisitorDependFrom,
	type RuleConstructContext
} from "../_utility.ts";
const modulesNonFunctional: Record<string, string> = {
	"cluster": `The NodeJS module is non functional in Deno; Use alternative \`node:worker_threads\` instead.`,
	"constants": `The NodeJS module is non functional in Deno.`,
	"domain": `The NodeJS module is non functional in Deno; Also deprecated in NodeJS.`,
	"punycode": `The NodeJS module is deprecated in Deno and NodeJS.`,
	"repl": `The NodeJS module is non functional in Deno.`,
	"trace_events": `The NodeJS module is non functional in Deno.`,
	"wasi": `The NodeJS module is non functional in Deno; Use standard WebAssembly API instead.`
};
function ruleAssertor(context: Deno.lint.RuleContext, source: Deno.lint.StringLiteral): void {
	if (source.value.startsWith("node:")) {
		const message: string | undefined = modulesNonFunctional[source.value.replace("node:", "")];
		if (typeof message !== "undefined") {
			context.report({
				node: source,
				message
			});
		}
	}
}
export default {
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
} satisfies RuleConstructContext as RuleConstructContext;
