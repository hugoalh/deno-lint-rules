import {
	constructVisitorDependSource,
	type RuleData
} from "../_utility.ts";
function ruleAssertor(context: Deno.lint.RuleContext, source: Deno.lint.StringLiteral): void {
	const sourceURL: URL | null = URL.parse(source.value);
	if (sourceURL !== null &&
		(
			sourceURL.protocol === "http:" ||
			sourceURL.protocol === "https:"
		) && (
			sourceURL.hostname === "deno.com" ||
			sourceURL.hostname === "deno.land" ||
			sourceURL.hostname === "www.deno.com" ||
			sourceURL.hostname === "www.deno.land"
		) && (
			sourceURL.pathname.startsWith("/std") ||
			sourceURL.pathname.startsWith("/x/")
		)
	) {
		context.report({
			node: source,
			message: `Depend module from DLMR (Deno Land Module Registry) is forbidden.`
		});
	}
}
export const ruleData: RuleData = {
	identifier: "no-depend-source-dlmr",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return constructVisitorDependSource(ruleAssertor.bind(null, context));
			}
		};
	}
};
