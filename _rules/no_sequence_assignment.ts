import type { RuleData } from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "no-sequence-assignment",
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					SequenceExpression(node: Deno.lint.SequenceExpression): void {
						if (node.expressions.length > 1 && !(
							node.parent.type === "ForInStatement" ||
							node.parent.type === "ForOfStatement" ||
							node.parent.type === "ForStatement"
						)) {
							const report: Deno.lint.ReportData = {
								node,
								message: `Sequence assignments is forbidden.`
							};
							if (context.sourceCode.getCommentsInside(node).length === 0) {
								report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
									return fixer.replaceText(node, node.expressions.map((expression: Deno.lint.Expression): string => {
										return `${context.sourceCode.getText(expression)};`;
									}).join(" "));
								};
							}
							context.report(report);
						}
					},
					VariableDeclaration(node: Deno.lint.VariableDeclaration): void {
						if (node.declarations.length > 1 && (
							node.kind === "const" ||
							node.kind === "let" ||
							node.kind === "var"
						) && !(
							node.parent.type === "ForInStatement" ||
							node.parent.type === "ForOfStatement" ||
							node.parent.type === "ForStatement"
						)) {
							const report: Deno.lint.ReportData = {
								node,
								message: `Sequence variables declaration is forbidden.`
							};
							if (context.sourceCode.getCommentsInside(node).length === 0) {
								report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
									return fixer.replaceText(node, node.declarations.map((declaration: Deno.lint.VariableDeclarator): string => {
										return `${node.kind} ${context.sourceCode.getText(declaration)};`;
									}).join(" "));
								};
							}
							context.report(report);
						}
					}
				};
			}
		};
	}
};
