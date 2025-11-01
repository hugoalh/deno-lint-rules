import type { RuleData } from "../_utility.ts";
const directive = "deno-lint-ignore-file";
const ruleMessage: string = `Require the Deno lint ignore file directive have a reason.`;
export const ruleData: RuleData = {
	identifier: "deno-lint-ignore-file-reason",
	tags: [
		"deno-lint-ignore-reason",
		"deno-ignore-reason",
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Line(node: Deno.lint.LineComment): void {
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
				};
			}
		};
	}
};
