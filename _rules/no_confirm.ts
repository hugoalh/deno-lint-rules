import type { DenoLintRuleDataPre } from "../_template.ts";
import { getClosestAncestor } from "../_utility.ts";
const ruleMessage = `Use of \`confirm\` is forbidden.`;
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			Identifier(node: Deno.lint.Identifier): void {
				// confirm
				if (node.name === "confirm") {
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
					// globalThis.confirm / window.confirm
					(node.object.type === "Identifier" && (
						node.object.name === "globalThis" ||
						node.object.name === "window"
					) && node.property.type === "Identifier" && node.property.name === "confirm") ||
					// globalThis.window.confirm
					(node.object.type === "MemberExpression" && node.object.object.type === "Identifier" && node.object.object.name === "globalThis" && node.object.property.type === "Identifier" && node.object.property.name === "window" && node.property.type === "Identifier" && node.property.name === "confirm")
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
	identifier: "no-confirm",
	context(): Deno.lint.Rule {
		return ruleContextStatic;
	}
};
