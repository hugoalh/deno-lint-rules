import {
	constructVisitorDependSource,
	type RuleData
} from "../_utility.ts";
function ruleAssertor(context: Deno.lint.RuleContext, source: Deno.lint.StringLiteral): void {
	if (source.value.startsWith("data:")) {
		context.report({
			node: source,
			message: `Depend module via protocol \`data:\` is hard to maintenance and not secure.`
		});
	}
}
export const ruleData: RuleData = {
	identifier: "no-depend-source-data",
	tags: [
		"recommended",
		"security"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return constructVisitorDependSource(ruleAssertor.bind(null, context));
			}
		};
	}
};
