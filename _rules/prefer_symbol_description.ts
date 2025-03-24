import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			CallExpression(node: Deno.lint.CallExpression): void {
				if (node.callee.type === "Identifier" && node.callee.name === "Symbol" && (
					node.arguments.length === 0 ||
					// undefined
					(node.arguments[0].type === "Identifier" && node.arguments[0].name === "undefined") ||
					(node.arguments[0].type === "MemberExpression" && (
						// globalThis.undefined / globalThis["undefined"] / window.undefined / window["undefined"]
						(
							node.arguments[0].object.type === "Identifier" && (
								node.arguments[0].object.name === "globalThis" ||
								node.arguments[0].object.name === "window"
							) && (
								(node.arguments[0].property.type === "Identifier" && node.arguments[0].property.name === "undefined") ||
								(node.arguments[0].property.type === "Literal" && node.arguments[0].property.value === "undefined")
							)
						) ||
						// globalThis.window.undefined / globalThis.window["undefined"] / globalThis["window"].undefined / globalThis["window"]["undefined"]
						(
							node.arguments[0].object.type === "MemberExpression" && node.arguments[0].object.object.type === "Identifier" && node.arguments[0].object.object.name === "globalThis" && (
								(node.arguments[0].object.property.type === "Identifier" && node.arguments[0].object.property.name === "window") ||
								(node.arguments[0].object.property.type === "Literal" && node.arguments[0].object.property.value === "window")
							) && (
								(node.arguments[0].property.type === "Identifier" && node.arguments[0].property.name === "undefined") ||
								(node.arguments[0].property.type === "Literal" && node.arguments[0].property.value === "undefined")
							)
						)
					))
				)) {
					context.report({
						node,
						message: `Prefer \`Symbol\` to have a description.`
					});
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "prefer-symbol-description",
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
