import {
	isRegExpLiteral,
	type DenoLintRuleData
} from "../_utility.ts";
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
export const ruleData: DenoLintRuleData<DenoLintRulePreferRegExpFlagUnicodeOptions> = {
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
						if (isRegExpLiteral(node)) {
							const { regex } = node;
							const flagsSplit: readonly string[] = regex.flags.split("");
							if (!(
								flagsSplit.includes("u") ||
								flagsSplit.includes("v")
							)) {
								const result: string = `/${regex.pattern}/${regex.flags}${flag}`;
								context.report({
									node,
									message: `Prefer the regular expression is contain Unicode flag (\`u\` or \`v\`).`,
									hint: `Do you mean \`${result}\`?`,
									fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
										return fixer.replaceText(node, result);
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
