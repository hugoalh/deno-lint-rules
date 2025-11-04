import type { RuleData } from "../_utility.ts";
const directive = "deno-lint-ignore";
const ruleMessage: string = `Require the Deno lint ignore line directive have a reason.`;
export const ruleData: RuleData = {
	identifier: "deno-lint-ignore-line-reason",
	tags: [
		"deno-lint-ignore-reason",
		"deno-ignore-reason",
		"recommended"
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
							} else if (comment.startsWith(`${directive} `)) {
								const parts: readonly string[] = comment.split(" ").slice(1);
								const dashesSeparatorIndex: number = parts.indexOf("--");
								const reason: string = (dashesSeparatorIndex === -1) ? "" : parts.slice(dashesSeparatorIndex + 1).join(" ").trim();
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
