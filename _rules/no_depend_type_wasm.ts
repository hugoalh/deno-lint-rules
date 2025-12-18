import {
	constructVisitorDependFrom,
	type RuleData
} from "../_utility.ts";
function ruleAssertor(context: Deno.lint.RuleContext, source: Deno.lint.StringLiteral): void {
	if (source.value.endsWith(".wasm")) {
		context.report({
			node: source,
			message: `Depend WASM (WebAssembly) module is forbidden.`
		});
	}
}
export const ruleData: RuleData = {
	identifier: "no-depend-type-wasm",
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return constructVisitorDependFrom(ruleAssertor.bind(null, context));
			}
		};
	}
};
