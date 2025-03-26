import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			IfStatement(node: Deno.lint.IfStatement): void {
				if (node.alternate !== null) {
					switch (((node.consequent.type === "BlockStatement") ? node.consequent.body[node.consequent.body.length - 1] : node.consequent).type) {
						case "BreakStatement":
							context.report({
								node,
								message: `The statement \`if\` has the statement \`break\` at the end, thus the statement \`else\` become unnecessary.`
							});
							break;
						case "ContinueStatement":
							context.report({
								node,
								message: `The statement \`if\` has the statement \`continue\` at the end, thus the statement \`else\` become unnecessary.`
							});
							break;
						case "ReturnStatement":
							context.report({
								node,
								message: `The statement \`if\` has the statement \`return\` at the end, thus the statement \`else\` become unnecessary.`
							});
							break;
					}
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-if-return-else",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
