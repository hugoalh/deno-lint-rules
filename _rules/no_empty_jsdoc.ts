import {
	dissectNodeJSDocLine,
	visitNodeBlockComment,
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
						for (const node of visitNodeBlockComment(context)) {
							const lines: NodeBlockCommentLine[] | undefined = dissectNodeJSDocLine(node);
							if (typeof lines !== "undefined" && lines.every(({ value }: NodeBlockCommentLine): boolean => {
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
