import {
	dissectNodeJSDocBlock,
	jsdocTagsSynonyms,
	visitNodeBlockComment,
	type RuleConstructContext
} from "../_utility.ts";
export default {
	identifier: "consistent-jsdoc-tag",
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
								if (valueTrim.startsWith("@")) {
									const tagCurrent: string = valueTrim.split(/\s+/g)[0];
									for (const [
										tagMain,
										...tagSynonyms
									] of jsdocTagsSynonyms) {
										if ((tagSynonyms as readonly string[]).includes(tagCurrent)) {
											const rangeBegin: number = block.cooked.range[0] + block.cooked.value.indexOf(tagCurrent);
											const range: Deno.lint.Range = [rangeBegin, rangeBegin + tagCurrent.length];
											context.report({
												range,
												message: `JSDoc tag \`${tagCurrent}\` is the synonym of \`${tagMain}\`. Use of JSDoc synonym tag is forbidden.`,
												hint: `Do you mean \`${tagMain}\`?`,
												fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
													return fixer.replaceTextRange(range, tagMain);
												}
											});
											break;
										}
									}
								}
							}
						}
					}
				};
			}
		};
	}
} satisfies RuleConstructContext;
