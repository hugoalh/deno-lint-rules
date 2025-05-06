/*
REFERENCE:
	- https://docs.deno.com/lint/rules/no-irregular-whitespace/
	- https://github.com/hediet/vscode-unicode-data/blob/f3d1aeb2cf538f5f44d89d2ae961df62e03ea0a1/out/invisibleCharacters.json
	- https://invisible-characters.com/
*/
import type { DenoLintRuleData } from "../_utility.ts";
const codePointsInvisibleLoosely: Set<number> = new Set<number>([
	0x7F,
	0xA0,
	0xAD,
	0x034F,
	0x061C,
	0x115F,
	0x1160,
	0x17B4,
	0x17B5,
	0x1CBB,
	0x1CBC,
	0x2800,
	0x3164,
	0xFEFF,
	0xFFA0,
	0xFFFC,
	0x0133FC
]);
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
					if (current === 0x0D) {
						// \r
						const next: number | undefined = raw.codePointAt(index + 1);
						if (next === 0x0A) {
							// \n; \r\n is valid, but \r is not
							index += 1;
							continue;
						}
					} else if (!(
						codePointsInvisibleLoosely.has(current) ||
						current === 0x0B ||
						current === 0x0C ||
						(current >= 0x180B && current <= 0x180E) ||
						(current >= 0x2000 && current <= 0x200F) ||
						(current >= 0x202A && current <= 0x202F) ||
						(current >= 0x205F && current <= 0x206F) ||
						(current >= 0xFE00 && current <= 0xFE0F) ||
						(current >= 0xFFF0 && current <= 0xFFF8) ||
						(current >= 0x01D173 && current <= 0x01D17A) ||
						(current >= 0x0E0000 && current <= 0x0E007F) ||
						(current >= 0x0E0100 && current <= 0x0E01EF)
					)) {
						continue;
					}
					const currentHex: string = current.toString(16).toUpperCase();
					const currentHexFmt: string =
						(currentHex.length <= 2) ? currentHex.padStart(2, "0") :
							(currentHex.length <= 4) ? currentHex.padStart(4, "0") :
								currentHex.padStart(6, "0");
					context.report({
						range: [index, index + String.fromCodePoint(current).length],
						message: `Character \`0x${currentHexFmt}\` is invisible hence forbidden.`
					});
				}
			}
		};
	}
};
export const ruleData: DenoLintRuleData = {
	identifier: "no-character-invisible",
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
