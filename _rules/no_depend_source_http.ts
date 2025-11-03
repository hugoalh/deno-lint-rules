import {
	constructVisitorDependSource,
	type RuleData
} from "../_utility.ts";
function ruleAssertor(context: Deno.lint.RuleContext, source: Deno.lint.StringLiteral): void {
	if (source.value.startsWith("http:")) {
		const sourceFmt: string = source.value.replace("http:", "https:");
		context.report({
			node: source,
			message: `Depend module via protocol \`http:\` is not secure.`,
			hint: `Do you mean \`${sourceFmt}\`?`,
			fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
				return fixer.replaceText(source, source.raw.replace(source.value, sourceFmt));
			}
		});
	}
}
export const ruleData: RuleData = {
	identifier: "no-depend-source-http",
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
