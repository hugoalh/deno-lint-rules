import {
	dissectNodeIgnoreDirective,
	visitNodeLineComment,
	type NodeIgnoreDirectiveDissect,
	type RuleData
} from "../_utility.ts";
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
					// NOTE: `Line` visitor does not work as of written.
					Program(): void {
						for (const node of visitNodeLineComment(context)) {
							const dissect: NodeIgnoreDirectiveDissect | undefined = dissectNodeIgnoreDirective(node, "deno-lint-ignore-file");
							if (typeof dissect !== "undefined" && (
								dissect.indexDDash === null ||
								dissect.params.slice(dissect.indexDDash).length === 0
							)) {
								context.report({
									node,
									message: `Require the Deno lint ignore file directive have a reason.`
								});
							}
						}
					}
				};
			}
		};
	}
};
