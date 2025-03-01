import type { DenoLintRuleDataPre } from "../_utility.ts";
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			DoWhileStatement(node: Deno.lint.DoWhileStatement): void {
				if (node.body.type !== "BlockStatement") {
					context.report({
						node,
						message: `Prefer statement \`do-while\` is in block.`
					});
				}
			},
			ForInStatement(node: Deno.lint.ForInStatement): void {
				if (node.body.type !== "BlockStatement") {
					context.report({
						node,
						message: `Prefer statement \`for-in\` is in block.`
					});
				}
			},
			ForOfStatement(node: Deno.lint.ForOfStatement): void {
				if (node.body.type !== "BlockStatement") {
					context.report({
						node,
						message: `Prefer statement \`for-of\` is in block.`
					});
				}
			},
			ForStatement(node: Deno.lint.ForStatement): void {
				if (node.body.type !== "BlockStatement") {
					context.report({
						node,
						message: `Prefer statement \`for\` is in block.`
					});
				}
			},
			IfStatement(node: Deno.lint.IfStatement): void {
				if (node.consequent.type !== "BlockStatement") {
					context.report({
						node,
						message: `Prefer statement \`if\` is in block.`
					});
				}
				if (node.alternate !== null && node.alternate.type !== "IfStatement" && node.alternate.type !== "BlockStatement") {
					context.report({
						node: node.alternate,
						message: `Prefer statement \`if-else\` is in block.`
					});
				}
			},
			WhileStatement(node: Deno.lint.WhileStatement): void {
				if (node.body.type !== "BlockStatement") {
					context.report({
						node,
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
		return ruleContextStatic;
	}
};
