/*
REFERENCE:
	- https://docs.deno.com/lint/rules/no-irregular-whitespace/
	- https://github.com/hediet/vscode-unicode-data/blob/f3d1aeb2cf538f5f44d89d2ae961df62e03ea0a1/out/invisibleCharacters.json
	- https://invisible-characters.com/
	- https://wikipedia.org/wiki/Variation_Selectors_(Unicode_block)

NOTE:
	These characters are not consider invisible:
	- 0x003000 Full width space
*/
import {
	getTextCodePoints,
	type RuleData
} from "../_utility.ts";
const segmenter = new Intl.Segmenter(undefined, {
	granularity: "grapheme",
	localeMatcher: "best fit"
});
export const ruleData: RuleData = {
	identifier: "no-character-invisible",
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Program(): void {
						for (const {
							index,
							segment
						} of segmenter.segment(context.sourceCode.text)) {
							const codepoints: readonly number[] = Array.from(getTextCodePoints(segment));
							if (
								// \r
								segment === "\u{00000D}" ||

								segment === "\u{00000B}" ||
								segment === "\u{00000C}" ||
								segment === "\u{00007F}" ||
								segment === "\u{0000A0}" ||
								segment === "\u{0000AD}" ||
								segment === "\u{00034F}" ||
								segment === "\u{00061C}" ||
								segment === "\u{00115F}" ||
								segment === "\u{001160}" ||
								segment === "\u{0017B4}" ||
								segment === "\u{0017B5}" ||
								segment === "\u{001CBB}" ||
								segment === "\u{001CBC}" ||
								segment === "\u{002800}" ||
								segment === "\u{003164}" ||
								segment === "\u{00FEFF}" ||
								segment === "\u{00FFA0}" ||
								segment === "\u{00FFFC}" ||
								segment === "\u{0133FC}" ||

								(codepoints.length === 1 &&
									(0x00180B <= codepoints[0] && codepoints[0] <= 0x00180E) ||
									(0x002000 <= codepoints[0] && codepoints[0] <= 0x00200F) ||
									(0x00202A <= codepoints[0] && codepoints[0] <= 0x00202F) ||
									(0x00205F <= codepoints[0] && codepoints[0] <= 0x00206F) ||

									// Variation Selectors
									(0x00FE00 <= codepoints[0] && codepoints[0] <= 0x00FE0F) ||

									(0x00FFF0 <= codepoints[0] && codepoints[0] <= 0x00FFF8) ||
									(0x01D173 <= codepoints[0] && codepoints[0] <= 0x01D17A) ||
									(0x0E0000 <= codepoints[0] && codepoints[0] <= 0x0E007F) ||
									(0x0E0100 <= codepoints[0] && codepoints[0] <= 0x0E01EF)
								)
							) {
								context.report({
									range: [index, index + segment.length],
									message: `Character \`${codepoints.map((codepoint: number): string => {
										//deno-lint-ignore hugoalh/max-complexity -- Bypass
										return `0x${codepoint.toString(16).toUpperCase().padStart(6, "0")}`;
									}).join(" ")}\` is invisible hence forbidden.`
								});
							}
						}
					}
				};
			}
		};
	}
};
