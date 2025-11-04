import type { RuleData } from "../_utility.ts";
const directive = "deno-coverage-ignore-file";
export const ruleData: RuleData = {
	identifier: "deno-coverage-ignore-file-reason",
	tags: [
		"deno-coverage-ignore-reason",
		"deno-ignore-reason"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					// NOTE: `Line` visitor does not work as of written.
					Program(): void {
						for (const node of context.sourceCode.getAllComments().filter((comment: Deno.lint.BlockComment | Deno.lint.LineComment): comment is Deno.lint.LineComment => {
							return (comment.type === "Line");
						})) {
							const comment: string = node.value.trim();
							if (comment.startsWith(directive)) {
								const reason: string = comment.replace(directive, "").trim();
								if (reason.length === 0) {
									context.report({
										node,
										message: `Require the Deno coverage ignore file directive have a reason.`
									});
								}
							}
						}
					}
				};
			}
		};
	}
};
