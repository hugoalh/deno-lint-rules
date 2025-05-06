import type { DenoLintRuleData } from "../_utility.ts";
function ruleAssertor(context: Deno.lint.RuleContext, node: Deno.lint.MethodDefinition | Deno.lint.PropertyDefinition): void {
	if (node.accessibility === "public") {
		context.report({
			node,
			message: `Use of modifier \`public\` is useless hence forbidden.`
		});
	}
}
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		const ruleAssertorBind = ruleAssertor.bind(null, context,);
		return {
			MethodDefinition: ruleAssertorBind,
			PropertyDefinition: ruleAssertorBind
		};
	}
};
export const ruleData: DenoLintRuleData = {
	identifier: "no-modifier-public",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
