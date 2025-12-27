import {
	dissectNodeIgnoreDirective,
	visitNodeLineComment,
	type NodeIgnoreDirectiveDissect,
	type RuleData
} from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "deno-fmt-ignore-line-reason",
	tags: [
		"deno-fmt-ignore-reason",
		"deno-ignore-reason"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					// NOTE: `Line` visitor does not work as of written.
					Program(): void {
						for (const node of visitNodeLineComment(context)) {
							const dissect: NodeIgnoreDirectiveDissect | undefined = dissectNodeIgnoreDirective(node, "deno-fmt-ignore");
							if (typeof dissect !== "undefined" && dissect.params.length < ((dissect.indexDDash === null) ? 1 : 2)) {
								context.report({
									node,
									message: `Require the Deno format ignore line directive have a reason.`
								});
							}
						}
					}
				};
			}
		};
	}
};
