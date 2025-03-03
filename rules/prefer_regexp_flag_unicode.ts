import type { DenoLintRuleDataPre } from "../_utility.ts";
export type DenoLintRulePreferRegExpFlagUnicodeType =
	| "u"
	| "v";
const flagsUnicode: readonly DenoLintRulePreferRegExpFlagUnicodeType[] = ["u", "v"];
export interface DenoLintRulePreferRegExpFlagUnicodeOptions {
	/**
	 * Select which regular expression Unicode flag should use.
	 * @default {"u"}
	 */
	flag?: DenoLintRulePreferRegExpFlagUnicodeType;
}
export const data: DenoLintRuleDataPre<DenoLintRulePreferRegExpFlagUnicodeOptions> = {
	identifier: "prefer-regexp-flag-unicode",
	context(options: DenoLintRulePreferRegExpFlagUnicodeOptions = {}): Deno.lint.Rule {
		const { flag = "u" }: DenoLintRulePreferRegExpFlagUnicodeOptions = options;
		if (!flagsUnicode.includes(flag)) {
			throw new RangeError(`\`${flag}\` is not a valid regular expression Unicode flag! Only accept these values: ${Array.from(flagsUnicode).sort().join(", ")}`);
		}
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Literal(node: Deno.lint.Literal): void {
						if (node.value instanceof RegExp) {
							const flags: readonly string[] = (node as Deno.lint.RegExpLiteral).regex.flags.split("");
							if (!(
								flags.includes("u") ||
								flags.includes("v")
							)) {
								const regexpExpect: string = `/${(node as Deno.lint.RegExpLiteral).regex.pattern}/${(node as Deno.lint.RegExpLiteral).regex.flags}${flag}`;
								context.report({
									node,
									message: `Prefer the regular expression is contain Unicode flag (\`u\` or \`v\`).`,
									hint: `Do you mean \`${regexpExpect}\`?`,
									fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
										return fixer.replaceText(node, regexpExpect);
									}
								});
							}
						}
					}
				};
			}
		};
	}
};
