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
					const currentCodePoint: number | undefined = raw.codePointAt(index);
					if (typeof currentCodePoint === "undefined") {
						continue;
					}
					const currentCharacter: string = String.fromCodePoint(currentCodePoint);
					const currentLength: number = currentCharacter.length;
					if (
						// Full width space
						currentCodePoint === 0x003000
					) {
						index += currentLength - 1;
						continue;
					}
					const nextCodePoint: number | undefined = raw.codePointAt(index + currentLength);
					// Variation Selectors
					if (typeof nextCodePoint !== "undefined" && (
						// CJK Compatibility Ideographs
						(0x00F900 <= currentCodePoint && currentCodePoint <= 0x00FAFF && 0x00FE00 <= nextCodePoint && nextCodePoint <= 0x00FE02) ||

						// CJK Unified Ideographs Extension A & B
						((
							(0x003400 <= currentCodePoint && currentCodePoint <= 0x004DBF) ||
							(0x020000 <= currentCodePoint && currentCodePoint <= 0x02A6DF)
						) && 0x00FE00 <= nextCodePoint && nextCodePoint <= 0x00FE01) ||

						// Emoji
						(regexpCharacterEmoji.test(currentCharacter) && 0x00FE0E <= nextCodePoint && nextCodePoint <= 0x00FE0F) ||

						// Basic Latin, Halfwidth & Fullwidth Forms, Manichaean, Myanmar, Myanmar Extended-A, Phags-pa, and Mathematical
						((
							(0x000000 <= currentCodePoint && currentCodePoint <= 0x00007F) ||
							(0x00FF00 <= currentCodePoint && currentCodePoint <= 0x00FFEF) ||
							(0x010AC0 <= currentCodePoint && currentCodePoint <= 0x010AFF) ||
							(0x001000 <= currentCodePoint && currentCodePoint <= 0x00109F) ||
							(0x00AA60 <= currentCodePoint && currentCodePoint <= 0x00AA7F) ||
							(0x00A840 <= currentCodePoint && currentCodePoint <= 0x00A87F) ||
							(0x002200 <= currentCodePoint && currentCodePoint <= 0x0022FF)
						) && nextCodePoint === 0x00FE00) ||

						// Egyptian Hieroglyphs
						((
							currentCodePoint === 0x013091 ||
							currentCodePoint === 0x01310F ||
							currentCodePoint === 0x01311C ||
							currentCodePoint === 0x013121 ||
							currentCodePoint === 0x013127 ||
							currentCodePoint === 0x013139 ||
							currentCodePoint === 0x0131A0 ||
							currentCodePoint === 0x0131B1 ||
							(0x0131B8 <= currentCodePoint && currentCodePoint <= 0x0131B9) ||
							currentCodePoint === 0x0131CB ||
							currentCodePoint === 0x0131E0 ||
							(0x0131F9 <= currentCodePoint && currentCodePoint <= 0x0131FA) ||
							currentCodePoint === 0x01327B ||
							currentCodePoint === 0x01327F ||
							currentCodePoint === 0x013285 ||
							currentCodePoint === 0x01328C ||
							currentCodePoint === 0x0132AA ||
							currentCodePoint === 0x0132CB ||
							currentCodePoint === 0x0132DC ||
							currentCodePoint === 0x0132E7 ||
							currentCodePoint === 0x013307 ||
							currentCodePoint === 0x01331B ||
							currentCodePoint === 0x013322 ||
							currentCodePoint === 0x01333C ||
							(0x013377 <= currentCodePoint && currentCodePoint <= 0x013378) ||
							(0x013399 <= currentCodePoint && currentCodePoint <= 0x01339A) ||
							currentCodePoint === 0x0133D3 ||
							currentCodePoint === 0x0133E5 ||
							currentCodePoint === 0x0133E7 ||
							currentCodePoint === 0x0133F2 ||
							(0x0133F5 <= currentCodePoint && currentCodePoint <= 0x0133F6) ||
							currentCodePoint === 0x013416 ||
							(0x013419 <= currentCodePoint && currentCodePoint <= 0x01341A) ||
							currentCodePoint === 0x013423
						) && nextCodePoint === 0x00FE00) ||
						((
							currentCodePoint === 0x013093 ||
							currentCodePoint === 0x013132 ||
							currentCodePoint === 0x013139 ||
							currentCodePoint === 0x013187 ||
							currentCodePoint === 0x0131B1 ||
							currentCodePoint === 0x0131EE ||
							(0x0131F8 <= currentCodePoint && currentCodePoint <= 0x0131FA) ||
							currentCodePoint === 0x013257 ||
							currentCodePoint === 0x01327F ||
							currentCodePoint === 0x0132A4 ||
							currentCodePoint === 0x013308 ||
							(0x013312 <= currentCodePoint && currentCodePoint <= 0x013314) ||
							currentCodePoint === 0x01331B ||
							(0x013321 <= currentCodePoint && currentCodePoint <= 0x013322) ||
							currentCodePoint === 0x013331 ||
							currentCodePoint === 0x0133E8 ||
							currentCodePoint === 0x013419
						) && nextCodePoint === 0x00FE01) ||
						((
							currentCodePoint === 0x013117 ||
							currentCodePoint === 0x013139 ||
							currentCodePoint === 0x013183 ||
							currentCodePoint === 0x0131A0 ||
							currentCodePoint === 0x0131BA ||
							currentCodePoint === 0x0131EE ||
							currentCodePoint === 0x013216 ||
							currentCodePoint === 0x01327B ||
							currentCodePoint === 0x0132A4 ||
							currentCodePoint === 0x0132E7 ||
							currentCodePoint === 0x0132E9 ||
							currentCodePoint === 0x0132F8 ||
							currentCodePoint === 0x0132FD ||
							(0x013302 <= currentCodePoint && currentCodePoint <= 0x013303) ||
							(0x013310 <= currentCodePoint && currentCodePoint <= 0x013314) ||
							currentCodePoint === 0x01331C ||
							currentCodePoint === 0x013321 ||
							currentCodePoint === 0x013331 ||
							currentCodePoint === 0x01334A ||
							currentCodePoint === 0x013361 ||
							currentCodePoint === 0x013373 ||
							currentCodePoint === 0x01337D ||
							currentCodePoint === 0x013385 ||
							(0x0133AF <= currentCodePoint && currentCodePoint <= 0x0133B0) ||
							currentCodePoint === 0x0133BF ||
							currentCodePoint === 0x0133DB ||
							currentCodePoint === 0x0133DD ||
							currentCodePoint === 0x013419 ||
							currentCodePoint === 0x01342C ||
							currentCodePoint === 0x01342E
						) && nextCodePoint === 0x00FE02) ||
						(currentCodePoint === 0x013338 && (
							nextCodePoint === 0x00FE03 ||
							nextCodePoint === 0x00FE06
						))
					)) {
						index += currentLength;
						continue;
					}
					if (
						// \r, exclude \r\n
						(currentCodePoint === 0x00000D && nextCodePoint !== 0x00000A) ||

						currentCodePoint === 0x00000B ||
						currentCodePoint === 0x00000C ||
						currentCodePoint === 0x00007F ||
						currentCodePoint === 0x0000A0 ||
						currentCodePoint === 0x0000AD ||
						currentCodePoint === 0x00034F ||
						currentCodePoint === 0x00061C ||
						currentCodePoint === 0x00115F ||
						currentCodePoint === 0x001160 ||
						currentCodePoint === 0x0017B4 ||
						currentCodePoint === 0x0017B5 ||
						currentCodePoint === 0x001CBB ||
						currentCodePoint === 0x001CBC ||
						currentCodePoint === 0x002800 ||
						currentCodePoint === 0x003164 ||
						currentCodePoint === 0x00FEFF ||
						currentCodePoint === 0x00FFA0 ||
						currentCodePoint === 0x00FFFC ||
						currentCodePoint === 0x0133FC ||
						(0x00180B <= currentCodePoint && currentCodePoint <= 0x00180E) ||
						(0x002000 <= currentCodePoint && currentCodePoint <= 0x00200F) ||
						(0x00202A <= currentCodePoint && currentCodePoint <= 0x00202F) ||
						(0x00205F <= currentCodePoint && currentCodePoint <= 0x00206F) ||
						(0x00FE00 <= currentCodePoint && currentCodePoint <= 0x00FE0F) ||
						(0x00FFF0 <= currentCodePoint && currentCodePoint <= 0x00FFF8) ||
						(0x01D173 <= currentCodePoint && currentCodePoint <= 0x01D17A) ||
						(0x0E0000 <= currentCodePoint && currentCodePoint <= 0x0E007F) ||
						(0x0E0100 <= currentCodePoint && currentCodePoint <= 0x0E01EF)
					) {
						context.report({
							range: [index, index + currentLength],
							message: `Character \`0x${currentCodePoint.toString(16).toUpperCase().padStart(6, "0")}\` is invisible hence forbidden.`
						});
					}
					index += currentLength - 1;
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
