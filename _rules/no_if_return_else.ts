import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			IfStatement(node: Deno.lint.IfStatement): void {
				if (node.alternate !== null && (
					(node.consequent.type === "BlockStatement" && node.consequent.body[node.consequent.body.length - 1].type === "ReturnStatement") ||
					node.consequent.type === "ReturnStatement"
				)) {
					context.report({
						node,
						message: `Statement \`if\` has the return statement at the end, thus statement \`else\` become unnecessary.`
					});
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
