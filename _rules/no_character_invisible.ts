/*
REFERENCE:
	- https://docs.deno.com/lint/rules/no-irregular-whitespace/
	- https://github.com/hediet/vscode-unicode-data/blob/f3d1aeb2cf538f5f44d89d2ae961df62e03ea0a1/out/invisibleCharacters.json
	- https://invisible-characters.com/
*/
import type { RuleData } from "../_utility.ts";
const codePointsInvisibleLoosely: Set<number> = new Set<number>([
	0x00007F,
	0x0000A0,
	0x0000AD,
	0x00034F,
	0x00061C,
	0x00115F,
	0x001160,
	0x0017B4,
	0x0017B5,
	0x001CBB,
	0x001CBC,
	0x002800,
	0x003164,
	0x00FEFF,
	0x00FFA0,
	0x00FFFC,
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
					if (current === 0x00000D) {
						// \r
						const next: number | undefined = raw.codePointAt(index + 1);
						if (next === 0x00000A) {
							// \n; \r\n is valid, but \r is not
							index += 1;
							continue;
						}
					} else if (!(
						codePointsInvisibleLoosely.has(current) ||
						current === 0x00000B ||
						current === 0x00000C ||
						(current >= 0x00180B && current <= 0x00180E) ||
						(current >= 0x002000 && current <= 0x00200F) ||
						(current >= 0x00202A && current <= 0x00202F) ||
						(current >= 0x00205F && current <= 0x00206F) ||
						(current >= 0x00FE00 && current <= 0x00FE0F) ||
						(current >= 0x00FFF0 && current <= 0x00FFF8) ||
						(current >= 0x01D173 && current <= 0x01D17A) ||
						(current >= 0x0E0000 && current <= 0x0E007F) ||
						(current >= 0x0E0100 && current <= 0x0E01EF)
					)) {
						continue;
					}
					context.report({
						range: [index, index + String.fromCodePoint(current).length],
						message: `Character \`0x${current.toString(16).toUpperCase().padStart(6, "0")}\` is invisible hence forbidden.`
					});
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
