import {
	visitNodeLineComment,
	type RuleData
} from "../_utility.ts";
const directive: string = "deno-coverage-ignore-file";
const regexpDirective = new RegExp(`^${directive}\\s`);
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
						for (const node of visitNodeLineComment(context)) {
							const comment: string = node.value.trim();
							if (
								comment === directive ||
								(regexpDirective.test(comment) && comment.slice(directive.length + 1).trim().length === 0)
							) {
								context.report({
									node,
									message: `Require the Deno coverage ignore file directive have a reason.`
								});
							}
						}
					}
				};
			}
		};
	}
};
