import {
	constructVisitorDependSource,
	type RuleData
} from "../_utility.ts";
function ruleAssertor(context: Deno.lint.RuleContext, source: Deno.lint.StringLiteral): void {
	if (source.value.startsWith("npm:")) {
		context.report({
			node: source,
			message: `Depend module from NPM via protocol \`npm:\` is forbidden.`
		});
	}
}
export const ruleData: RuleData = {
	identifier: "no-depend-from-npm-protocol",
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return constructVisitorDependSource(ruleAssertor.bind(null, context));
			}
		};
	}
};
