import type { DenoLintRuleDataPre } from "../_template.ts";
function constructRuleReport(statement: Exclude<Deno.lint.Statement, Deno.lint.BlockStatement>): Omit<Deno.lint.ReportData, "message"> {
	return {
		node: statement,
		fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
			return [
				fixer.insertTextAfter(statement, "}"),
				fixer.insertTextBefore(statement, "{")
			];
		}
	};
};
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			DoWhileStatement(node: Deno.lint.DoWhileStatement): void {
				if (node.body.type !== "BlockStatement") {
					context.report({
						...constructRuleReport(node.body),
						message: `Prefer the body of the statement \`do-while\` is in block.`
					});
				}
			},
			ForInStatement(node: Deno.lint.ForInStatement): void {
				if (node.body.type !== "BlockStatement") {
					context.report({
						...constructRuleReport(node.body),
						message: `Prefer the body of the statement \`for-in\` is in block.`
					});
				}
			},
			ForOfStatement(node: Deno.lint.ForOfStatement): void {
				if (node.body.type !== "BlockStatement") {
					context.report({
						...constructRuleReport(node.body),
						message: `Prefer the body of the statement \`for-of\` is in block.`
					});
				}
			},
			ForStatement(node: Deno.lint.ForStatement): void {
				if (node.body.type !== "BlockStatement") {
					context.report({
						...constructRuleReport(node.body),
						message: `Prefer the body of the statement \`for\` is in block.`
					});
				}
			},
			IfStatement(node: Deno.lint.IfStatement): void {
				if (node.consequent.type !== "BlockStatement") {
					context.report({
						...constructRuleReport(node.consequent),
						message: `Prefer the body of the statement \`if\` is in block.`
					});
				}
				if (!(
					node.alternate === null ||
					node.alternate.type === "BlockStatement" ||
					node.alternate.type === "IfStatement"
				)) {
					context.report({
						...constructRuleReport(node.alternate),
						message: `Prefer the body of the statement \`else\` is in block.`
					});
				}
			},
			WhileStatement(node: Deno.lint.WhileStatement): void {
				if (node.body.type !== "BlockStatement") {
					context.report({
						...constructRuleReport(node.body),
						message: `Prefer the body of the statement \`while\` is in block.`
					});
				}
			},
			WithStatement(node: Deno.lint.WithStatement): void {
				if (node.body.type !== "BlockStatement") {
					context.report({
						...constructRuleReport(node.body),
						message: `Prefer the body of the statement \`with\` is in block.`
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
