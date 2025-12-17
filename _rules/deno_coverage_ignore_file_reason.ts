import type { RuleData } from "../_utility.ts";
const directive: string = "deno-coverage-ignore-file";
const regexpDirective = new RegExp(`^${directive}\\s`);
const ruleMessage: string = `Require the Deno coverage ignore file directive have a reason.`;
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
							if (comment === directive) {
								context.report({
									node,
									message: ruleMessage
								});
							} else if (regexpDirective.test(comment)) {
								const reason: string = comment.slice(directive.length + 1).trim();
								if (reason.length === 0) {
									context.report({
										node,
										message: ruleMessage
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
