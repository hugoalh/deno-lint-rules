import type { RuleConstructContext } from "../_utility.ts";
export interface RuleMaxNestTernariesOptions {
	/**
	 * Maximum nest of the ternary expressions.
	 * @default {0}
	 */
	maximum?: number;
}
export default {
	identifier: "max-nest-ternaries",
	querier(payload: RuleMaxNestTernariesOptions = {}): Deno.lint.Rule {
		const { maximum = 0 }: RuleMaxNestTernariesOptions = payload;
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
								message: `Too many nested ternary expressions; Maximum: ${maximum}, Current: ${count}.`
							});
						}
					}
				};
			}
		};
	}
} as RuleConstructContext;
