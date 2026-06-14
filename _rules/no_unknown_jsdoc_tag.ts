import {
	dissectNodeJSDocBlock,
	jsdocTags,
	resolveClosestString,
	visitNodeBlockComment,
	type RuleConstructContext
} from "../_utility.ts";
export default {
	identifier: "no-unknown-jsdoc-tag",
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
									if (!(jsdocTags as readonly string[]).includes(tagCurrent)) {
										const rangeBegin: number = block.cooked.range[0] + block.cooked.value.indexOf(tagCurrent);
										const range: Deno.lint.Range = [rangeBegin, rangeBegin + tagCurrent.length];
										const report: Deno.lint.ReportData = {
											range,
											message: `Unknown JSDoc tag.`
										};
										const tagClosest: string | null = resolveClosestString(tagCurrent, jsdocTags, { caseSensitive: true });
										if (tagClosest !== null) {
											report.hint = `Do you mean \`${tagClosest}\``;
											report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
												return fixer.replaceTextRange(range, tagClosest);
											};
										}
										context.report(report);
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
