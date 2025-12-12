import {
	constructVisitorDependSource,
	type RuleData
} from "../_utility.ts";
function ruleAssertor(context: Deno.lint.RuleContext, source: Deno.lint.StringLiteral): void {
	if (source.value.startsWith("http:")) {
		const result: string = source.value.replace("http:", "https:");
		context.report({
			node: source,
			message: `Depend module via protocol \`http:\` is not secure.`,
			hint: `Do you mean \`${result}\`?`,
			fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
				return fixer.replaceText(source, source.raw.replace(source.value, result));
			}
		});
	}
}
export const ruleData: RuleData = {
	identifier: "no-depend-from-http",
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
