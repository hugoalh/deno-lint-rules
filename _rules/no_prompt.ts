import type { DenoLintRuleDataPre } from "../_template.ts";
import { getClosestAncestor } from "../_utility.ts";
const ruleMessage = `Use of \`prompt\` is forbidden.`;
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			Identifier(node: Deno.lint.Identifier): void {
				// prompt
				if (node.name === "prompt") {
					if ((getClosestAncestor(context, node)).type !== "MemberExpression") {
						context.report({
							node,
							message: ruleMessage
						});
					}
				}
			},
			MemberExpression(node: Deno.lint.MemberExpression): void {
				if (
					// globalThis.prompt / window.prompt
					(node.object.type === "Identifier" && (
						node.object.name === "globalThis" ||
						node.object.name === "window"
					) && node.property.type === "Identifier" && node.property.name === "prompt") ||
					// globalThis.window.prompt
					(node.object.type === "MemberExpression" && node.object.object.type === "Identifier" && node.object.object.name === "globalThis" && node.object.property.type === "Identifier" && node.object.property.name === "window" && node.property.type === "Identifier" && node.property.name === "prompt")
				) {
					context.report({
						node,
						message: ruleMessage
					});
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-prompt",
	context(): Deno.lint.Rule {
		return ruleContextStatic;
	}
};
