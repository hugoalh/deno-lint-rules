import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			DoWhileStatement(node: Deno.lint.DoWhileStatement): void {
				if (node.body.type !== "BlockStatement") {
					context.report({
						node,
						message: `Prefer statement \`do-while\` is in block.`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
							return fixer.replaceText(node.body, `{ ${context.sourceCode.getText(node.body)} }`);
						}
					});
				}
			},
			ForInStatement(node: Deno.lint.ForInStatement): void {
				if (node.body.type !== "BlockStatement") {
					context.report({
						node,
						message: `Prefer statement \`for-in\` is in block.`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
							return fixer.replaceText(node.body, `{ ${context.sourceCode.getText(node.body)} }`);
						}
					});
				}
			},
			ForOfStatement(node: Deno.lint.ForOfStatement): void {
				if (node.body.type !== "BlockStatement") {
					context.report({
						node,
						message: `Prefer statement \`for-of\` is in block.`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
							return fixer.replaceText(node.body, `{ ${context.sourceCode.getText(node.body)} }`);
						}
					});
				}
			},
			ForStatement(node: Deno.lint.ForStatement): void {
				if (node.body.type !== "BlockStatement") {
					context.report({
						node,
						message: `Prefer statement \`for\` is in block.`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
							return fixer.replaceText(node.body, `{ ${context.sourceCode.getText(node.body)} }`);
						}
					});
				}
			},
			IfStatement(node: Deno.lint.IfStatement): void {
				if (node.consequent.type !== "BlockStatement") {
					context.report({
						node,
						message: `Prefer statement \`if\` is in block.`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
							return fixer.replaceText(node.consequent, `{ ${context.sourceCode.getText(node.consequent)} }`);
						}
					});
				}
				if (node.alternate !== null && node.alternate.type !== "IfStatement" && node.alternate.type !== "BlockStatement") {
					context.report({
						node: node.alternate,
						message: `Prefer statement \`if-else\` is in block.`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
							return fixer.replaceText(node.alternate!, `{ ${context.sourceCode.getText(node.alternate!)} }`);
						}
					});
				}
			},
			WhileStatement(node: Deno.lint.WhileStatement): void {
				if (node.body.type !== "BlockStatement") {
					context.report({
						node,
						message: `Prefer statement \`while\` is in block.`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
							return fixer.replaceText(node.body, `{ ${context.sourceCode.getText(node.body)} }`);
						}
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
