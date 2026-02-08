import type { RuleData } from "../_utility.ts";
export interface RuleMaxIdentifierLengthOptions {
	/**
	 * Maximum length of the identifier.
	 * @default {40}
	 */
	maximum?: number;
}
export const ruleData: RuleData<RuleMaxIdentifierLengthOptions> = {
	identifier: "max-identifier-length",
	querier(options: RuleMaxIdentifierLengthOptions = {}): Deno.lint.Rule {
		const { maximum = 40 }: RuleMaxIdentifierLengthOptions = options;
		if (!(Number.isSafeInteger(maximum) && maximum > 0)) {
			throw new RangeError(`Parameter \`maximum\` is not a valid number which is integer, safe, and > 0!`);
		}
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Identifier(node: Deno.lint.Identifier): void {
						const length: number = node.name.length;
						if (length > maximum) {
							context.report({
								node,
								message: `Identifier too long; Maximum: ${maximum}, Current: ${length}.`
							});
						}
					}
				};
			}
		};
	}
};
