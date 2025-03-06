import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleMessage = `Use of \`alert\` is forbidden.`;
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			Identifier(node: Deno.lint.Identifier): void {
				if (node.name === "alert") {
					const nodeAncestor: Deno.lint.Node[] = context.sourceCode.getAncestors(node);
					if (nodeAncestor[nodeAncestor.length - 1].type !== "MemberExpression") {
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
