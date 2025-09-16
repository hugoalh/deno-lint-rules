import {
	isNodeBigIntLiteral,
	isNodeBooleanLiteral,
	isNodeNullLiteral,
	isNodeNumberLiteral,
	isNodeRegExpLiteral,
	isNodeStringLiteral,
	type RuleData
} from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "no-useless-template-string-expression",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					TemplateLiteral(node: Deno.lint.TemplateLiteral): void {
						if (node.quasis.length - 1 !== node.expressions.length) {
							return;
						}
						for (let index: number = 0; index < node.expressions.length; index += 1) {
							const expression: Deno.lint.Expression = node.expressions[index];
							if (
								expression.type === "Literal" ||
								expression.type === "TemplateLiteral"
							) {
								// NOTE: Range is given differently between Deno lint, ESLint, and TSLint.
								const range: Deno.lint.Range = [node.quasis[index].range[1], node.quasis[index + 1].range[0]];
								const report: Deno.lint.ReportData = {
									range,
									message: `The template string expression is useless, possibly mergeable.`
								};
								if (
									isNodeBigIntLiteral(expression) ||
									isNodeBooleanLiteral(expression) ||
									isNodeNumberLiteral(expression)
								) {
									report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
										return fixer.replaceTextRange(range, expression.value.toString());
									};
								} else if (isNodeNullLiteral(expression)) {
									report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
										return fixer.replaceTextRange(range, "null");
									};
								} else if (isNodeRegExpLiteral(expression)) {
									report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
										return fixer.replaceTextRange(range, expression.value!.toString());
									};
								} else if (isNodeStringLiteral(expression) && !(
									expression.value.includes("`") ||
									expression.value.includes("${") ||
									(expression.raw.startsWith("'") && expression.value.includes("\\'")) ||
									(expression.raw.startsWith("\"") && expression.value.includes("\\\""))
								)) {
									report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
										return fixer.replaceTextRange(range, expression.value);
									};
								} else if (expression.type === "TemplateLiteral") {
									const raw: string = context.sourceCode.getText(expression);
									report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
										return fixer.replaceTextRange(range, raw.slice(1, raw.length - 1));
									};
								}
								context.report(report);
							}
						}
					}
				};
			}
		};
	}
};
