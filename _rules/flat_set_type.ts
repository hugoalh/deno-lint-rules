import type { RuleConstructContext } from "../_utility.ts";
interface RuleFlatSetTypeAssertorPayload {
	namePascal: string;
	operator: string;
}
function ruleAssertor(payload: RuleFlatSetTypeAssertorPayload, context: Deno.lint.RuleContext, node: Deno.lint.TSIntersectionType | Deno.lint.TSUnionType): void {
	if (node.parent.type === node.type) {
		const { namePascal }: RuleFlatSetTypeAssertorPayload = payload;
		context.report({
			node,
			message: `${namePascal} with child ${namePascal.toLowerCase()} have the same effect as single ${namePascal.toLowerCase()}, possibly mergeable.`
		});
	}
}
export default {
	identifier: "flat-set-type",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					TSIntersectionType(node: Deno.lint.TSIntersectionType): void {
						ruleAssertor({
							namePascal: "Intersection",
							operator: "&"
						}, context, node);
					},
					TSUnionType(node: Deno.lint.TSUnionType): void {
						ruleAssertor({
							namePascal: "Union",
							operator: "|"
						}, context, node);
					}
				};
			}
		};
	}
} satisfies RuleConstructContext as RuleConstructContext;
