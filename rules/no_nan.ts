import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleMessage = `Number literals with NaN is usually an error and not intended.`;
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			Identifier(node: Deno.lint.Identifier): void {
				// NaN
				if (node.name === "NaN") {
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
					// globalThis.NaN / Number.NaN
					(node.object.type === "Identifier" && (
						node.object.name === "globalThis" ||
						node.object.name === "Number"
					) && node.property.type === "Identifier" && node.property.name === "NaN") ||
					// globalThis.Number.NaN
					(node.object.type === "MemberExpression" && node.object.object.type === "Identifier" && node.object.object.name === "globalThis" && node.object.property.type === "Identifier" && node.object.property.name === "Number" && node.property.type === "Identifier" && node.property.name === "NaN")
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
	identifier: "no-nan",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContextStatic;
	}
};
