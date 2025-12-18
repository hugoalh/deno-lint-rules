import {
	visitNodeLineComment,
	type RuleData
} from "../_utility.ts";
const directive: string = "deno-fmt-ignore-file";
const regexpDirective = new RegExp(`^${directive}\\s`);
const ruleMessage: string = `Require the Deno format ignore file directive have a reason.`;
export const ruleData: RuleData = {
	identifier: "deno-fmt-ignore-file-reason",
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
