import {
	dissectNodeJSDocBlock,
	visitNodeBlockComment,
	type RuleData
} from "../_utility.ts";
const directive: string = "@deprecated";
const regexpDirective = new RegExp(`^${directive}\\s`);
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
							for (const block of (dissectNodeJSDocBlock(node) ?? [])) {
								const valueTrim: string = block.cooked.value.trim();
								if (
									valueTrim === directive ||
									(regexpDirective.test(valueTrim) && valueTrim.slice(directive.length + 1).trim().length === 0)
								) {
									context.report({
										range: block.cooked.range,
										message: `Require the JSDoc \`@deprecated\` tag have a reason.`
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
