import {
	getNodesRaw,
	isNodeBlockStatementHasDeclaration,
	type RuleData
} from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "no-useless-try",
	tags: [
		"efficiency",
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					TryStatement(node: Deno.lint.TryStatement): void {
						if (
							(
								node.handler === null ||
								(node.handler.body.body.length === 0 && context.sourceCode.getCommentsInside(node.handler).length === 0)
							) && (
								node.finalizer === null ||
								node.finalizer.body.length === 0 && context.sourceCode.getCommentsInside(node.finalizer).length === 0
							)
						) {
							context.report({
								node,
								message: `The statement \`try-catch-finally\` is useless.`,
								fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
									return fixer.replaceText(node, isNodeBlockStatementHasDeclaration(node.block) ? context.sourceCode.getText(node.block) : getNodesRaw(context, node.block.body));
								}
							});
						}
					}
				};
			}
		};
	}
};
