import type { RuleData } from "../_utility.ts";
export interface RuleMaxNestTernaryOptions {
	/**
	 * Maximum nest of the ternaries.
	 * @default {0}
	 */
	maximum?: number;
}
export const ruleData: RuleData<RuleMaxNestTernaryOptions> = {
	identifier: "max-nest-ternary",
	querier(options: RuleMaxNestTernaryOptions = {}): Deno.lint.Rule {
		const { maximum = 0 }: RuleMaxNestTernaryOptions = options;
		if (!(Number.isSafeInteger(maximum) && maximum >= 0)) {
			throw new RangeError(`Parameter \`maximum\` is not a valid number which is integer, positive, and safe!`);
		}
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ConditionalExpression(node: Deno.lint.ConditionalExpression): void {
						let count: number = 0;
						let target: Deno.lint.ConditionalExpression = node;
						while (target.parent.type === "ConditionalExpression") {
							count += 1;
							target = target.parent;
						}
						if (count > maximum) {
							context.report({
								node,
								message: `Too many nested ternaries; Maximum: ${maximum}, Current: ${count}.`
							});
						}
					}
				};
			}
		};
	}
};
