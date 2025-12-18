import {
	visitNodeLineComment,
	type RuleData
} from "../_utility.ts";
const directiveTarget: string = "@deno-types";
const regexpDirectiveTarget = new RegExp(`^${directiveTarget}\\s*=`);
const directiveReplace: string = "@ts-types";
export const ruleData: RuleData = {
	identifier: "no-deno-types",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					// NOTE: `Line` visitor does not work as of written.
					Program(): void {
						for (const node of visitNodeLineComment(context)) {
							if (regexpDirectiveTarget.test(node.value.trim())) {
								const rangeBegin: number = node.range[0] + 2 + node.value.indexOf(directiveTarget);
								const range: Deno.lint.Range = [rangeBegin, rangeBegin + directiveTarget.length];
								context.report({
									range,
									message: `Use of \`${directiveTarget}\` directive is deprecated and forbidden; Use \`${directiveReplace}\` directive instead.`,
									fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
										return fixer.replaceTextRange(range, directiveReplace);
									}
								});
							}
						}
					}
				};
			}
		};
	}
};
