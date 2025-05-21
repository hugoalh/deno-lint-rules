import type { RuleData } from "../_utility.ts";
const ruleMessage = `Use of modifier \`private\` will not actually make it private, hence forbidden; Use \`#\` instead.`;
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			MethodDefinition(node: Deno.lint.MethodDefinition): void {
				if (node.kind !== "constructor" && node.accessibility === "private") {
					context.report({
						node,
						message: ruleMessage
					});
				}
			},
			PropertyDefinition(node: Deno.lint.PropertyDefinition): void {
				if (node.accessibility === "private") {
					context.report({
						node,
						message: ruleMessage
					});
				}
			}
		};
	}
};
export const ruleData: RuleData = {
	identifier: "no-modifier-private",
	sets: ["recommended"],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
