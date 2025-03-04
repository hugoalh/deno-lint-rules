import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			CallExpression(node: Deno.lint.CallExpression): void {
				if (
					// prompt
					(node.callee.type === "Identifier" && node.callee.name === "prompt") ||
					// globalThis.prompt
					(node.callee.type === "MemberExpression" && node.callee.object.type === "Identifier" && node.callee.object.name === "globalThis" && node.callee.property.type === "Identifier" && node.callee.property.name === "prompt") ||
					// globalThis.window.prompt
					(node.callee.type === "MemberExpression" && node.callee.object.type === "MemberExpression" && node.callee.object.object.type === "Identifier" && node.callee.object.object.name === "globalThis" && node.callee.object.property.type === "Identifier" && node.callee.object.property.name === "window" && node.callee.property.type === "Identifier" && node.callee.property.name === "prompt") ||
					// window.prompt
					(node.callee.type === "MemberExpression" && node.callee.object.type === "Identifier" && node.callee.object.name === "window" && node.callee.property.type === "Identifier" && node.callee.property.name === "prompt")
				) {
					context.report({
						node,
						message: `Use of \`prompt\` is forbidden.`
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
