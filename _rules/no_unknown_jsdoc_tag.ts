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
									const tag: string = value.split(" ")[0];
									if (!jsdocTags.includes(tag)) {
										context.report({
											range: [rangeValueBegin, rangeValueBegin + tag.length],
											message: `Unknown JSDoc tag.`
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
