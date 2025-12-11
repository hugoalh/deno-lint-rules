import { closestString } from "jsr:@std/text@^1.0.16/closest-string";
import { levenshteinDistance } from "jsr:@std/text@^1.0.16/levenshtein-distance";
import {
	dissectNodeJSDoc,
	type RuleData
} from "../_utility.ts";
const jsdocTags: readonly string[] = [
	"@abstract",
	"@virtual",
	"@access",
	"@alias",
	"@async",
	"@augments",
	"@extends",
	"@author",
	"@borrows",
	"@class",
	"@constructor",
	"@classdesc",
	"@constant",
	"@const",
	"@constructs",
	"@copyright",
	"@default",
	"@defaultvalue",
	"@deprecated",
	"@description",
	"@desc",
	"@enum",
	"@event",
	"@example",
	"@exports",
	"@external",
	"@host",
	"@file",
	"@fileoverview",
	"@overview",
	"@fires",
	"@emits",
	"@function",
	"@func",
	"@method",
	"@generator",
	"@global",
	"@hideconstructor",
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
	"@var",
	"@memberof",
	"@mixes",
	"@mixin",
	"@module",
	"@name",
	"@namespace",
	"@override",
	"@package",
	"@param",
	"@arg",
	"@argument",
	"@private",
	"@property",
	"@prop",
	"@protected",
	"@public",
	"@readonly",
	"@requires",
	"@returns",
	"@return",
	"@see",
	"@since",
	"@static",
	"@summary",
	"@this",
	"@throws",
	"@exception",
	"@todo",
	"@tutorial",
	"@type",
	"@typedef",
	"@variation",
	"@version",
	"@yields",
	"@yield"
];
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
						for (const node of context.sourceCode.getAllComments().filter((comment: Deno.lint.BlockComment | Deno.lint.LineComment): comment is Deno.lint.BlockComment => {
							return (comment.type === "Block");
						})) {
							for (const {
								rangeValue: [rangeValueBegin],
								value
							} of (dissectNodeJSDoc(node) ?? [])) {
								if (value.startsWith("@")) {
									const tagCurrent: string = value.split(" ")[0];
									if (!jsdocTags.includes(tagCurrent)) {
										const range: Deno.lint.Range = [rangeValueBegin, rangeValueBegin + tagCurrent.length];
										const report: Deno.lint.ReportData = {
											range: range,
											message: `Unknown JSDoc tag.`
										};
										const tagsLDG: string[] = jsdocTags.filter((jsdocTag: string): boolean => {
											return (levenshteinDistance(tagCurrent, jsdocTag) <= 2);
										});
										if (tagsLDG.length > 0) {
											const tagClosest: string = closestString(tagCurrent, tagsLDG, { caseSensitive: true });
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
