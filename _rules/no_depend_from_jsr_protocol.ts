import {
	constructVisitorDependFrom,
	type RuleData
} from "../_utility.ts";
function ruleAssertor(context: Deno.lint.RuleContext, source: Deno.lint.StringLiteral): void {
	if (source.value.startsWith("jsr:")) {
		context.report({
			node: source,
			message: `Depend module from JSR via protocol \`jsr:\` is forbidden.`
		});
	}
}
export const ruleData: RuleData = {
	identifier: "no-depend-from-jsr-protocol",
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return constructVisitorDependFrom(ruleAssertor.bind(null, context));
			}
		};
	}
};
