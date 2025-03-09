import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			TryStatement(node: Deno.lint.TryStatement): void {
				const hasCatch: boolean = node.handler !== null;
				const isCatchUseless: boolean = hasCatch && node.handler!.param?.type === "Identifier" && (
					node.handler!.body.body.length === 0 ||
					(node.handler!.body.body[0].type === "ThrowStatement" && node.handler!.body.body[0].argument.type === "Identifier" && node.handler!.body.body[0].argument.name === node.handler!.param.name)
				);
				const hasFinally: boolean = node.finalizer !== null;
				const isFinallyUseless: boolean = hasFinally && node.finalizer!.body.length === 0;
				if (isCatchUseless && isFinallyUseless) {
					context.report({
						node,
						message: `The statement \`try-catch-finally\` is useless.`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
							return fixer.replaceText(node, context.sourceCode.getText(node.block).slice(1, -1));
						}
					});
				} else if (isCatchUseless) {
					context.report({
						node,
						message: `The statement \`try-catch\` is useless.`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
							if (hasFinally) {
								return fixer.remove(node.handler!);
							}
							return fixer.replaceText(node, context.sourceCode.getText(node.block).slice(1, -1));
						}
					});
				} else if (isFinallyUseless) {
					context.report({
						node,
						message: `The statement \`try-finally\` is useless.`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
							if (hasCatch) {
								return fixer.remove(node.finalizer!);
							}
							return fixer.replaceText(node, context.sourceCode.getText(node.block).slice(1, -1));
						}
					});
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-useless-try",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContextStatic;
	}
};
