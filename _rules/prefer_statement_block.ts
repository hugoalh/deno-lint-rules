import type { DenoLintRuleDataPre } from "../_template.ts";
function constructRuleReport(context: Deno.lint.RuleContext, statement: Exclude<Deno.lint.Statement, Deno.lint.BlockStatement>): Pick<Deno.lint.ReportData, "fix" | "node"> {
	return {
		node: statement,
		fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
			return fixer.replaceText(statement, `{${context.sourceCode.getText(statement)}}`);
		}
	};
};
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			DoWhileStatement(node: Deno.lint.DoWhileStatement): void {
				if (node.body.type !== "BlockStatement") {
					context.report({
						...constructRuleReport(context, node.body),
						message: `Prefer statement \`do-while\` is in block.`
					});
				}
			},
			ForInStatement(node: Deno.lint.ForInStatement): void {
				if (node.body.type !== "BlockStatement") {
					context.report({
						...constructRuleReport(context, node.body),
						message: `Prefer statement \`for-in\` is in block.`
					});
				}
			},
			ForOfStatement(node: Deno.lint.ForOfStatement): void {
				if (node.body.type !== "BlockStatement") {
					context.report({
						...constructRuleReport(context, node.body),
						message: `Prefer statement \`for-of\` is in block.`
					});
				}
			},
			ForStatement(node: Deno.lint.ForStatement): void {
				if (node.body.type !== "BlockStatement") {
					context.report({
						...constructRuleReport(context, node.body),
						message: `Prefer statement \`for\` is in block.`
					});
				}
			},
			IfStatement(node: Deno.lint.IfStatement): void {
				if (node.consequent.type !== "BlockStatement") {
					context.report({
						...constructRuleReport(context, node.consequent),
						message: `Prefer statement \`if\` is in block.`
					});
				}
				if (node.alternate !== null && node.alternate.type !== "IfStatement" && node.alternate.type !== "BlockStatement") {
					context.report({
						...constructRuleReport(context, node.alternate),
						message: `Prefer statement \`else\` is in block.`
					});
				}
			},
			WhileStatement(node: Deno.lint.WhileStatement): void {
				if (node.body.type !== "BlockStatement") {
					context.report({
						...constructRuleReport(context, node.body),
						message: `Prefer statement \`while\` is in block.`
					});
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "prefer-statement-block",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
