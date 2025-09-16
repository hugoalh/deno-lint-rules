import type { RuleData } from "../_utility.ts";
const ruleMessage: string = `Use of modifier \`private\` will not actually make it private, hence forbidden; Use \`#\` instead.`;
export const ruleData: RuleData = {
	identifier: "no-modifier-private",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
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
	}
};
