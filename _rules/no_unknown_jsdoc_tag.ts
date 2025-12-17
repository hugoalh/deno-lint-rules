import { closestString } from "jsr:@std/text@^1.0.16/closest-string";
import { levenshteinDistance } from "jsr:@std/text@^1.0.16/levenshtein-distance";
import {
	dissectNodeJSDocBlock,
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
							} of (dissectNodeJSDocBlock(node) ?? [])) {
								if (value.startsWith("@")) {
									const tagCurrent: string = value.split(/\s+/g)[0];
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
