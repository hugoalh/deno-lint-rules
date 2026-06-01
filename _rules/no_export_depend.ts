import {
	constructVisitorExportFrom,
	type RuleConstructContext
} from "../_utility.ts";
function ruleAssertor(context: Deno.lint.RuleContext, source: Deno.lint.StringLiteral): void {
	if (!(
		source.value.startsWith("./") ||
		source.value.startsWith("../")
	)) {
		context.report({
			node: source,
			message: `Export dependency is forbidden.`
		});
	}
}
export default {
	identifier: "no-export-depend",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return constructVisitorExportFrom(ruleAssertor.bind(null, context));
			}
		};
	}
} satisfies RuleConstructContext as RuleConstructContext;
