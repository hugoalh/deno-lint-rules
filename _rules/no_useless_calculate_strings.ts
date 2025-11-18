import {
	isNodeStringLiteral,
	type RuleData
} from "../_utility.ts";
const ruleMessage: string = `Calculate on strings is useless.`;
export const ruleData: RuleData = {
	identifier: "no-useless-calculate-strings",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					BinaryExpression(node: Deno.lint.BinaryExpression): void {
						if (node.operator === "+") {
							if (node.left.type === "TemplateLiteral" && node.right.type === "TemplateLiteral") {
								const report: Deno.lint.ReportData = {
									node,
									message: ruleMessage
								};
								if (context.sourceCode.getCommentsInside(node).length - context.sourceCode.getCommentsInside(node.left).length - context.sourceCode.getCommentsInside(node.right).length === 0) {
									const result: string = `\`${context.sourceCode.getText(node.left).slice(1, -1)}${context.sourceCode.getText(node.right).slice(1, -1)}\``;
									report.hint = `Do you mean \`${result}\`?`;
									report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
										return fixer.replaceText(node, result);
									};
								}
								context.report(report);
							} else if (isNodeStringLiteral(node.left) && isNodeStringLiteral(node.right)) {
								if (node.left.raw.startsWith("\"") && node.right.raw.startsWith("\"")) {
									const report: Deno.lint.ReportData = {
										node,
										message: ruleMessage
									};
									if (context.sourceCode.getCommentsInside(node).length === 0) {
										const result: string = `"${node.left.raw.slice(1, -1)}${node.right.raw.slice(1, -1)}"`;
										report.hint = `Do you mean \`${result}\`?`;
										report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
											return fixer.replaceText(node, result);
										};
									}
									context.report(report);
								} else if (node.left.raw.startsWith("'") && node.right.raw.startsWith("'")) {
									const report: Deno.lint.ReportData = {
										node,
										message: ruleMessage
									};
									if (context.sourceCode.getCommentsInside(node).length === 0) {
										const result: string = `'${node.left.raw.slice(1, -1)}${node.right.raw.slice(1, -1)}'`;
										report.hint = `Do you mean \`${result}\`?`;
										report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
											return fixer.replaceText(node, result);
										};
									}
									context.report(report);
								} else {
									context.report({
										node,
										message: ruleMessage
									});
								}
							}
						}
					}
				};
			}
		};
	}
};
