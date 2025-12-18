import {
	dissectNodeNumberLiteral,
	isNodeNumberLiteral,
	type NodeNumberLiteralDissect,
	type RuleData
} from "../_utility.ts";
export interface RuleFmtNumericExponentSignOptions {
	/**
	 * Whether to require positive exponent with plus (`+`) sign.
	 * @default {false}
	 * @example
	 * ```ts
	 * ---
	 * signForPositive: false
	 * ---
	 * 1e4;
	 * 1e-4;
	 * ```
	 * @example
	 * ```ts
	 * ---
	 * signForPositive: true
	 * ---
	 * 1e+4;
	 * 1e-4;
	 * ```
	 */
	signForPositive?: boolean;
}
export const ruleData: RuleData = {
	identifier: "fmt-numeric-exponent-sign",
	tags: [
		"fmt"
	],
	querier(options: RuleFmtNumericExponentSignOptions = {}): Deno.lint.Rule {
		const { signForPositive = false }: RuleFmtNumericExponentSignOptions = options;
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Literal(node: Deno.lint.Literal): void {
						if (isNodeNumberLiteral(node)) {
							const {
								exponent,
								exponentIndexBegin
							}: NodeNumberLiteralDissect = dissectNodeNumberLiteral(node);
							if (exponent !== null && !exponent.includes("-")) {
								const expect: string = signForPositive ? (
									exponent.includes("+") ? exponent : `${exponent.slice(0, 1)}+${exponent.slice(1)}`
								) : exponent.replace("+", "");
								if (exponent !== expect) {
									const rangeBegin: number = node.range[0] + exponentIndexBegin!;
									const range: Deno.lint.Range = [rangeBegin, rangeBegin + exponent.length];
									context.report({
										range,
										message: `Require normalize the sign of the numeric exponent.`,
										hint: `Do you mean \`${expect}\`?`,
										fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
											return fixer.replaceTextRange(range, expect);
										}
									});
								}
							}
						}
					}
				};
			}
		};
	}
};
