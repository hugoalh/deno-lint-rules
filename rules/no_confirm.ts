import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			CallExpression(node: Deno.lint.CallExpression): void {
				if (
					// confirm
					(node.callee.type === "Identifier" && node.callee.name === "confirm") ||
					// globalThis.confirm
					(node.callee.type === "MemberExpression" && node.callee.object.type === "Identifier" && node.callee.object.name === "globalThis" && node.callee.property.type === "Identifier" && node.callee.property.name === "confirm") ||
					// globalThis.window.confirm
					(node.callee.type === "MemberExpression" && node.callee.object.type === "MemberExpression" && node.callee.object.object.type === "Identifier" && node.callee.object.object.name === "globalThis" && node.callee.object.property.type === "Identifier" && node.callee.object.property.name === "window" && node.callee.property.type === "Identifier" && node.callee.property.name === "confirm") ||
					// window.confirm
					(node.callee.type === "MemberExpression" && node.callee.object.type === "Identifier" && node.callee.object.name === "window" && node.callee.property.type === "Identifier" && node.callee.property.name === "confirm")
				) {
					context.report({
						node,
						message: `Use of \`confirm\` is forbidden.`
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
