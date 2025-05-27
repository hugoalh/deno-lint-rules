import type { RuleData } from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			IfStatement(node: Deno.lint.IfStatement): void {
				if (node.alternate !== null) {
					switch ((node.consequent.type === "BlockStatement") ? node.consequent.body[node.consequent.body.length - 1]?.type : node.consequent.type) {
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
						case "ThrowStatement":
							context.report({
								node,
								message: `The statement \`if\` has the statement \`throw\` at the end, thus the statement \`else\` become unnecessary.`
							});
							break;
					}
				}
			}
		};
	}
};
export const ruleData: RuleData = {
	identifier: "no-useless-else",
	sets: [
		"recommended"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
