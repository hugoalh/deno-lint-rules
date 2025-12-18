import {
	dissectNodeJSDocBlock,
	visitNodeBlockComment,
	type RuleData
} from "../_utility.ts";
const directive: string = "@deprecated";
const regexpDirective = new RegExp(`^${directive}\\s`);
const ruleMessage: string = `Require the JSDoc \`@deprecated\` tag have a reason.`;
export const ruleData: RuleData = {
	identifier: "jsdoc-deprecated-reason",
	tags: [
		"jsdoc",
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					// NOTE: `Block` visitor does not work as of written.
					Program(): void {
						for (const node of visitNodeBlockComment(context)) {
							for (const {
								rangeValue,
								value
							} of (dissectNodeJSDocBlock(node) ?? [])) {
								if (value === directive) {
									context.report({
										range: rangeValue,
										message: ruleMessage
									});
								} else if (regexpDirective.test(value)) {
									const reason: string = value.slice(directive.length + 1).trim();
									if (reason.length === 0) {
										context.report({
											range: rangeValue,
											message: ruleMessage
										});
									}
								}
							}
						}
					}
				};
			}
		};
	}
};
