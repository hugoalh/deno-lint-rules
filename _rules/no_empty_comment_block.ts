import {
	visitNodeBlockComment,
	type RuleData
} from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "no-empty-comment-block",
	tags: [
		"no-empty-comment",
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					// NOTE: `Block` visitor does not work as of written.
					Program(): void {
						for (const node of visitNodeBlockComment(context)) {
							if (node.value.trim().length === 0) {
								context.report({
									node,
									message: `Empty comment block is forbidden.`,
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
