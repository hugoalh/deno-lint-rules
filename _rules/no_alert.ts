import type { DenoLintRuleDataPre } from "../_template.ts";
import { getClosestAncestor } from "../_utility.ts";
const ruleMessage = `Use of \`alert\` is forbidden.`;
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			Identifier(node: Deno.lint.Identifier): void {
				// alert
				if (node.name === "alert") {
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
					// globalThis.alert / globalThis["alert"] / window.alert / window["alert"]
					(
						node.object.type === "Identifier" && (
							node.object.name === "globalThis" ||
							node.object.name === "window"
						) && (
							(node.property.type === "Identifier" && node.property.name === "alert") ||
							(node.property.type === "Literal" && node.property.value === "alert")
						)
					) ||
					// globalThis.window.alert / globalThis.window["alert"] / globalThis["window"].alert / globalThis["window"]["alert"]
					(
						node.object.type === "MemberExpression" && node.object.object.type === "Identifier" && node.object.object.name === "globalThis" && (
							(node.object.property.type === "Identifier" && node.object.property.name === "window") ||
							(node.object.property.type === "Literal" && node.object.property.value === "window")
						) && (
							(node.property.type === "Identifier" && node.property.name === "alert") ||
							(node.property.type === "Literal" && node.property.value === "alert")
						)
					)
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
	identifier: "no-alert",
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
