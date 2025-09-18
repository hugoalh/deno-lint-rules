import type { RuleData } from "../_utility.ts";
const directive = "deno-fmt-ignore";
export const ruleData: RuleData = {
	identifier: "require-fmt-ignore-line-reason",
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Line(node: Deno.lint.LineComment): void {
						const comment: string = node.value.trim();
						if (comment.startsWith(directive)) {
							const reason: string = comment.replace(directive, "").trim();
							if (reason.length === 0) {
								context.report({
									node,
									message: `Require fmt ignore line directive have reason.`
								});
							}
						}
					}
				};
			}
		};
	}
};
