import {
	dissectNodeJSDocLine,
	type NodeBlockCommentLine,
	type RuleData
} from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "no-empty-jsdoc",
	tags: [
		"jsdoc",
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					// NOTE: `Block` visitor does not work as of written.
					Program(): void {
						for (const node of context.sourceCode.getAllComments().filter((comment: Deno.lint.BlockComment | Deno.lint.LineComment): comment is Deno.lint.BlockComment => {
							return (comment.type === "Block");
						})) {
							const doc: NodeBlockCommentLine[] | undefined = dissectNodeJSDocLine(node);
							// NOTE: `doc` undefined means the block comment is not a JSDoc.
							if (typeof doc !== "undefined" && doc.every(({ value }: NodeBlockCommentLine): boolean => {
								return (value.length === 0);
							})) {
								context.report({
									node,
									message: `Empty JSDoc is forbidden.`,
									fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
										return fixer.remove(node);
									}
								});
							}
						}
					}
				};
			}
		};
	}
};
