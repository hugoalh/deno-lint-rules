import {
	isNodeRegExpLiteral,
	type RuleData
} from "../_utility.ts";
export type RegExpFlagUnicodeType =
	| "u"
	| "v";
const flagsUnicode: readonly RegExpFlagUnicodeType[] = ["u", "v"];
export interface RuleRegExpFlagUnicodeOptions {
	/**
	 * Which regular expression Unicode flag should use.
	 * @default {"u"}
	 */
	flag?: RegExpFlagUnicodeType;
}
export const ruleData: RuleData<RuleRegExpFlagUnicodeOptions> = {
	identifier: "regexp-flag-unicode",
	querier(options: RuleRegExpFlagUnicodeOptions = {}): Deno.lint.Rule {
		const { flag = "u" }: RuleRegExpFlagUnicodeOptions = options;
		if (!flagsUnicode.includes(flag)) {
			throw new RangeError(`\`${flag}\` is not a valid regular expression Unicode flag! Only accept these values: ${flagsUnicode.toSorted().join(", ")}`);
		}
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Literal(node: Deno.lint.Literal): void {
						if (isNodeRegExpLiteral(node)) {
							if (!(
								node.regex.flags.includes("u") ||
								node.regex.flags.includes("v")
							)) {
								const result: string = `/${node.regex.pattern}/${node.regex.flags}${flag}`;
								context.report({
									node,
									message: `Require the regular expression contain Unicode flag (\`u\` or \`v\`).`,
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
