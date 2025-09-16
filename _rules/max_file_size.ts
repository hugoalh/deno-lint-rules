import type { RuleData } from "../_utility.ts";
export interface RuleMaxFileSizeOptions {
	/**
	 * Maximum size of the file, in bytes. Default to 1 MiB.
	 * @default {1048576}
	 */
	maximum?: number;
}
export const ruleData: RuleData<RuleMaxFileSizeOptions> = {
	identifier: "max-file-size",
	querier(options: RuleMaxFileSizeOptions = {}): Deno.lint.Rule {
		const { maximum = 1048576 }: RuleMaxFileSizeOptions = options;
		if (!(Number.isSafeInteger(maximum) && maximum >= 0)) {
			throw new RangeError(`Parameter \`maximum\` is not a valid number which is integer, positive, and safe!`);
		}
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Program(): void {
						const length: number = context.sourceCode.text.length;
						if (length > maximum) {
							context.report({
								range: [maximum + 1, length],
								message: `File too large; Maximum: ${maximum}, Current: ${length}.`
							});
						}
					}
				};
			}
		};
	}
};
