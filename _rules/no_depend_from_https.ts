import {
	constructVisitorDependFrom,
	type RuleConstructContext
} from "../_utility.ts";
function ruleAssertor(context: Deno.lint.RuleContext, source: Deno.lint.StringLiteral): void {
	if (source.value.startsWith("https:")) {
		context.report({
			node: source,
			message: `Depend module via protocol \`https:\` is forbidden.`
		});
	}
}
export default {
	identifier: "no-depend-from-https",
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return constructVisitorDependFrom(ruleAssertor.bind(null, context));
			}
		};
	}
} as RuleConstructContext;
