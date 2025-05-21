import {
	serializeNode,
	type RuleData
} from "../_utility.ts";
function ruleReportSameResult(context: Deno.lint.RuleContext, nodeIssue: Deno.lint.ConditionalExpression, nodeResult: Deno.lint.Expression): void {
	const result: string = context.sourceCode.getText(nodeResult);
	context.report({
		node: nodeIssue,
		message: `Ternary with same result is useless.`,
		hint: `Do you mean \`${result}\`?`,
		fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
			return fixer.replaceText(nodeIssue, result);
		}
	});
}
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			ConditionalExpression(node: Deno.lint.ConditionalExpression): void {
				if (node.consequent.type === "Literal" && node.alternate.type === "Literal") {
					if (node.consequent.value === node.alternate.value) {
						ruleReportSameResult(context, node, node.consequent);
					} else if (typeof node.consequent.value === "boolean" && typeof node.alternate.value === "boolean") {
						// NOTE: It is impossible to have cases of `x ? true : true` or `x ? false : false` at here, which already handled by the previous condition.
						const target: string = context.sourceCode.getText(node.test);
						const targetNeedWrap: boolean = !(
							node.test.type === "BinaryExpression" ||
							node.test.type === "LogicalExpression"
						);
						const targetWrap: string = targetNeedWrap ? `Boolean(${target})` : target;
						const result: string = (node.consequent.value && !node.alternate.value) ? targetWrap : `!${targetNeedWrap ? targetWrap : `(${targetWrap})`}`;
						context.report({
							node,
							message: `Ternary with boolean result is useless.`,
							hint: `Do you mean \`${result}\`?`,
							fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
								return fixer.replaceText(node, result);
							}
						});
					}
				} else if (serializeNode(node.consequent) === serializeNode(node.alternate)) {
					// NOTE: This section is intended to duplicate the equals literal part to prevent slow node serialize issue.
					ruleReportSameResult(context, node, node.consequent);
				}
			}
		};
	}
};
export const ruleData: RuleData = {
	identifier: "no-useless-ternary",
	sets: ["recommended"],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
