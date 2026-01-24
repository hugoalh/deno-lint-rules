import type { RuleData } from "../_utility.ts";
export interface RuleMaxFileLinesOptions {
	/**
	 * Maximum lines of the script file.
	 * @default {2048}
	 */
	maximum?: number;
}
const regexpLF = /\n/g;
export const ruleData: RuleData<RuleMaxFileLinesOptions> = {
	identifier: "max-file-lines",
	querier(options: RuleMaxFileLinesOptions = {}): Deno.lint.Rule {
		const { maximum = 2048 }: RuleMaxFileLinesOptions = options;
		if (!(Number.isSafeInteger(maximum) && maximum >= 0)) {
			throw new RangeError(`Parameter \`maximum\` is not a valid number which is integer, positive, and safe!`);
		}
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Program(): void {
						const matches: readonly RegExpExecArray[] = Array.from(context.sourceCode.text.matchAll(regexpLF));
						if (matches.length >= maximum) {
							context.report({
								range: [matches[maximum - 1].index + 1, context.sourceCode.text.length],
								message: `Script file too many lines; Maximum: ${maximum}, Current: ${matches.length + 1}.`
							});
						}
					}
				};
			}
		};
	}
};
