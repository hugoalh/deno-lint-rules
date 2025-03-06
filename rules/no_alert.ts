import type { DenoLintRuleDataPre } from "../_template.ts";
import { getClosestAncestor } from "../_utility/ancestor.ts";
const ruleMessage = `Use of \`alert\` is forbidden.`;
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			Identifier(node: Deno.lint.Identifier): void {
				// alert
				if (node.name === "alert") {
					const nodeAncestor: Deno.lint.Node = getClosestAncestor(context, node);
					if (nodeAncestor.type !== "MemberExpression") {
						context.report({
							node,
							message: ruleMessage
						});
					}
				}
			},
			MemberExpression(node: Deno.lint.MemberExpression): void {
				if (
					// globalThis.alert / window.alert
					(node.object.type === "Identifier" && (
						node.object.name === "globalThis" ||
						node.object.name === "window"
					) && node.property.type === "Identifier" && node.property.name === "alert") ||
					// globalThis.window.alert
					(node.object.type === "MemberExpression" && node.object.object.type === "Identifier" && node.object.object.name === "globalThis" && node.object.property.type === "Identifier" && node.object.property.name === "window" && node.property.type === "Identifier" && node.property.name === "alert")
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
		return ruleContextStatic;
	}
};
