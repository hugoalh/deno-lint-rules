import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			CallExpression(node: Deno.lint.CallExpression): void {
				if (
					// alert
					(node.callee.type === "Identifier" && node.callee.name === "alert") ||
					// globalThis.alert
					(node.callee.type === "MemberExpression" && node.callee.object.type === "Identifier" && node.callee.object.name === "globalThis" && node.callee.property.type === "Identifier" && node.callee.property.name === "alert") ||
					// globalThis.window.alert
					(node.callee.type === "MemberExpression" && node.callee.object.type === "MemberExpression" && node.callee.object.object.type === "Identifier" && node.callee.object.object.name === "globalThis" && node.callee.object.property.type === "Identifier" && node.callee.object.property.name === "window" && node.callee.property.type === "Identifier" && node.callee.property.name === "alert") ||
					// window.alert
					(node.callee.type === "MemberExpression" && node.callee.object.type === "Identifier" && node.callee.object.name === "window" && node.callee.property.type === "Identifier" && node.callee.property.name === "alert")
				) {
					context.report({
						node,
						message: `Use of \`alert\` is forbidden.`
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
