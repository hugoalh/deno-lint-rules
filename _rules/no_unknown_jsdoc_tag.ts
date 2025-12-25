import {
	dissectNodeJSDocBlock,
	StringCorrection,
	visitNodeBlockComment,
	type RuleData
} from "../_utility.ts";
const jsdocTags: readonly string[] = /* UNIQUE */[
	"@abstract",
	"@access",
	"@alias",
	"@arg",
	"@argument",
	"@async",
	"@augments",
	"@author",
	"@borrows",
	"@class",
	"@classdesc",
	"@const",
	"@constant",
	"@constructor",
	"@constructs",
	"@copyright",
	"@default",
	"@defaultvalue",
	"@deprecated",
	"@desc",
	"@description",
	"@emits",
	"@enum",
	"@event",
	"@example",
	"@exception",
	"@exports",
	"@extends",
	"@external",
	"@file",
	"@fileoverview",
	"@fires",
	"@func",
	"@function",
	"@generator",
	"@global",
	"@hideconstructor",
	"@host",
	"@ignore",
	"@implements",
	"@inheritdoc",
	"@inner",
	"@instance",
	"@interface",
	"@kind",
	"@lends",
	"@license",
	"@listens",
	"@member",
	"@memberof",
	"@memberof!",
	"@method",
	"@mixes",
	"@mixin",
	"@module",
	"@name",
	"@namespace",
	"@override",
	"@overview",
	"@package",
	"@param",
	"@private",
	"@prop",
	"@property",
	"@protected",
	"@public",
	"@readonly",
	"@requires",
	"@return",
	"@returns",
	"@see",
	"@since",
	"@static",
	"@summary",
	"@template",
	"@this",
	"@throws",
	"@todo",
	"@tutorial",
	"@type",
	"@typedef",
	"@var",
	"@variation",
	"@version",
	"@virtual",
	"@yield",
	"@yields"
];
const correctioner: StringCorrection = new StringCorrection(jsdocTags);
export const ruleData: RuleData = {
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
									if (!jsdocTags.includes(tagCurrent)) {
										const rangeBegin: number = block.cooked.range[0] + block.cooked.value.indexOf(tagCurrent);
										const range: Deno.lint.Range = [rangeBegin, rangeBegin + tagCurrent.length];
										const report: Deno.lint.ReportData = {
											range,
											message: `Unknown JSDoc tag.`
										};
										const tagClosest: string | null = correctioner.find(tagCurrent);
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
};
