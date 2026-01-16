import {
	constructVisitorExportFrom,
	type RuleData
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
export const ruleData: RuleData = {
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
};
