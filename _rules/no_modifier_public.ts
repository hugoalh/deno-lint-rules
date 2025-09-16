import type { RuleData } from "../_utility.ts";
function ruleAssertor(context: Deno.lint.RuleContext, node: Deno.lint.MethodDefinition | Deno.lint.PropertyDefinition): void {
	if (node.accessibility === "public") {
		context.report({
			node,
			message: `Use of modifier \`public\` is useless hence forbidden.`
		});
	}
}
export const ruleData: RuleData = {
	identifier: "no-modifier-public",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				const ruleAssertorBind = ruleAssertor.bind(null, context);
				return {
					MethodDefinition: ruleAssertorBind,
					PropertyDefinition: ruleAssertorBind
				};
			}
		};
	}
};
