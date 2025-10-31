import type { RuleData } from "../_utility.ts";
const directive = "deno-coverage-ignore-start";
export const ruleData: RuleData = {
	identifier: "deno-coverage-ignore-start-reason",
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
									message: `Require the Deno coverage ignore start directive have a reason.`
								});
							}
						}
					}
				};
			}
		};
	}
};
