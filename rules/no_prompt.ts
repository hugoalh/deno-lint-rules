import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleMessage = `Use of \`prompt\` is forbidden.`;
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			Identifier(node: Deno.lint.Identifier): void {
				if (node.name === "prompt") {
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
