import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			TryStatement(node: Deno.lint.TryStatement): void {
				const isCatchExist: boolean = node.handler !== null;
				const isCatchUseless: boolean = isCatchExist && (
					node.handler!.body.body.length === 0 ||
					(node.handler!.param?.type === "Identifier" && node.handler!.body.body[0].type === "ThrowStatement" && node.handler!.body.body[0].argument.type === "Identifier" && node.handler!.body.body[0].argument.name === node.handler!.param.name)
				);
				const isFinallyExist: boolean = node.finalizer !== null;
				const isFinallyUseless: boolean = isFinallyExist && node.finalizer!.body.length === 0;
				if (isCatchUseless && isFinallyUseless) {
					context.report({
						node,
						message: `The statement \`try-catch-finally\` is useless.`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
							return fixer.replaceText(node, context.sourceCode.getText(node.block));
						}
					});
				} else if (isCatchUseless) {
					context.report({
						node: isFinallyExist ? node.handler! : node,
						message: `The statement \`try-catch\` is useless.`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
							return (isFinallyExist ? fixer.remove(node.handler!) : fixer.replaceText(node, context.sourceCode.getText(node.block)));
						}
					});
				} else if (isFinallyUseless) {
					context.report({
						node: isCatchExist ? node.finalizer! : node,
						message: `The statement \`try-finally\` is useless.`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
							return (isCatchExist ? fixer.remove(node.finalizer!) : fixer.replaceText(node, context.sourceCode.getText(node.block)));
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
		return ruleContext;
	}
};
