//deno-lint-ignore-file hugoalh/max-complexity
/*
REFERENCE:
	- https://docs.deno.com/lint/rules/no-irregular-whitespace/
	- https://github.com/hediet/vscode-unicode-data/blob/f3d1aeb2cf538f5f44d89d2ae961df62e03ea0a1/out/invisibleCharacters.json
	- https://invisible-characters.com/
	- https://wikipedia.org/wiki/Variation_Selectors_(Unicode_block)
*/
import type { RuleData } from "../_utility.ts";
const regexpCharacterEmoji = /^\p{Emoji}$/v;
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			Program(): void {
				const raw: string = context.sourceCode.text;
				for (let index: number = 0; index < raw.length; index += 1) {
					const current: number | undefined = raw.codePointAt(index);
					if (typeof current === "undefined") {
						continue;
					}
					const currentString: string = String.fromCodePoint(current);
					const length: number = currentString.length;
					if (
						// Full width space
						current === 0x003000
					) {
						index += length - 1;
						continue;
					}
					const next: number | undefined = raw.codePointAt(index + length);
					// Variation Selectors
					if (typeof next !== "undefined" && (
						// CJK Compatibility Ideographs
						(0x00F900 <= current && current <= 0x00FAFF && 0x00FE00 <= next && next <= 0x00FE02) ||

						// CJK Unified Ideographs Extension A & B
						((
							(0x003400 <= current && current <= 0x004DBF) ||
							(0x020000 <= current && current <= 0x02A6DF)
						) && 0x00FE00 <= next && next <= 0x00FE01) ||

						// Emoji
						(regexpCharacterEmoji.test(currentString) && 0x00FE0E <= next && next <= 0x00FE0F) ||

						// Basic Latin, Halfwidth & Fullwidth Forms, Manichaean, Myanmar, Myanmar Extended-A, Phags-pa, and Mathematical
						((
							(0x000000 <= current && current <= 0x00007F) ||
							(0x00FF00 <= current && current <= 0x00FFEF) ||
							(0x010AC0 <= current && current <= 0x010AFF) ||
							(0x001000 <= current && current <= 0x00109F) ||
							(0x00AA60 <= current && current <= 0x00AA7F) ||
							(0x00A840 <= current && current <= 0x00A87F) ||
							(0x002200 <= current && current <= 0x0022FF)
						) && next === 0x00FE00) ||

						// Egyptian Hieroglyphs
						((
							current === 0x013091 ||
							current === 0x01310F ||
							current === 0x01311C ||
							current === 0x013121 ||
							current === 0x013127 ||
							current === 0x013139 ||
							current === 0x0131A0 ||
							current === 0x0131B1 ||
							(0x0131B8 <= current && current <= 0x0131B9) ||
							current === 0x0131CB ||
							current === 0x0131E0 ||
							(0x0131F9 <= current && current <= 0x0131FA) ||
							current === 0x01327B ||
							current === 0x01327F ||
							current === 0x013285 ||
							current === 0x01328C ||
							current === 0x0132AA ||
							current === 0x0132CB ||
							current === 0x0132DC ||
							current === 0x0132E7 ||
							current === 0x013307 ||
							current === 0x01331B ||
							current === 0x013322 ||
							current === 0x01333C ||
							(0x013377 <= current && current <= 0x013378) ||
							(0x013399 <= current && current <= 0x01339A) ||
							current === 0x0133D3 ||
							current === 0x0133E5 ||
							current === 0x0133E7 ||
							current === 0x0133F2 ||
							(0x0133F5 <= current && current <= 0x0133F6) ||
							current === 0x013416 ||
							(0x013419 <= current && current <= 0x01341A) ||
							current === 0x013423
						) && next === 0x00FE00) ||
						((
							current === 0x013093 ||
							current === 0x013132 ||
							current === 0x013139 ||
							current === 0x013187 ||
							current === 0x0131B1 ||
							current === 0x0131EE ||
							(0x0131F8 <= current && current <= 0x0131FA) ||
							current === 0x013257 ||
							current === 0x01327F ||
							current === 0x0132A4 ||
							current === 0x013308 ||
							(0x013312 <= current && current <= 0x013314) ||
							current === 0x01331B ||
							(0x013321 <= current && current <= 0x013322) ||
							current === 0x013331 ||
							current === 0x0133E8 ||
							current === 0x013419
						) && next === 0x00FE01) ||
						((
							current === 0x013117 ||
							current === 0x013139 ||
							current === 0x013183 ||
							current === 0x0131A0 ||
							current === 0x0131BA ||
							current === 0x0131EE ||
							current === 0x013216 ||
							current === 0x01327B ||
							current === 0x0132A4 ||
							current === 0x0132E7 ||
							current === 0x0132E9 ||
							current === 0x0132F8 ||
							current === 0x0132FD ||
							(0x013302 <= current && current <= 0x013303) ||
							(0x013310 <= current && current <= 0x013314) ||
							current === 0x01331C ||
							current === 0x013321 ||
							current === 0x013331 ||
							current === 0x01334A ||
							current === 0x013361 ||
							current === 0x013373 ||
							current === 0x01337D ||
							current === 0x013385 ||
							(0x0133AF <= current && current <= 0x0133B0) ||
							current === 0x0133BF ||
							current === 0x0133DB ||
							current === 0x0133DD ||
							current === 0x013419 ||
							current === 0x01342C ||
							current === 0x01342E
						) && next === 0x00FE02) ||
						(current === 0x013338 && (
							next === 0x00FE03 ||
							next === 0x00FE06
						))
					)) {
						index += length;
						continue;
					}
					if (
						// \r, exclude \r\n
						(current === 0x00000D && next !== 0x00000A) ||

						current === 0x00000B ||
						current === 0x00000C ||
						current === 0x00007F ||
						current === 0x0000A0 ||
						current === 0x0000AD ||
						current === 0x00034F ||
						current === 0x00061C ||
						current === 0x00115F ||
						current === 0x001160 ||
						current === 0x0017B4 ||
						current === 0x0017B5 ||
						current === 0x001CBB ||
						current === 0x001CBC ||
						current === 0x002800 ||
						current === 0x003164 ||
						current === 0x00FEFF ||
						current === 0x00FFA0 ||
						current === 0x00FFFC ||
						current === 0x0133FC ||
						(0x00180B <= current && current <= 0x00180E) ||
						(0x002000 <= current && current <= 0x00200F) ||
						(0x00202A <= current && current <= 0x00202F) ||
						(0x00205F <= current && current <= 0x00206F) ||
						(0x00FE00 <= current && current <= 0x00FE0F) ||
						(0x00FFF0 <= current && current <= 0x00FFF8) ||
						(0x01D173 <= current && current <= 0x01D17A) ||
						(0x0E0000 <= current && current <= 0x0E007F) ||
						(0x0E0100 <= current && current <= 0x0E01EF)
					) {
						context.report({
							range: [index, index + length],
							message: `Character \`0x${current.toString(16).toUpperCase().padStart(6, "0")}\` is invisible hence forbidden.`
						});
					}
					index += length - 1;
				}
			}
		};
	}
};
export const ruleData: RuleData = {
	identifier: "no-character-invisible",
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
