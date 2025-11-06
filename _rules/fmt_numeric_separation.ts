import {
	dissectNodeBigIntLiteral,
	dissectNodeNumberLiteral,
	isNodeBigIntLiteral,
	isNodeNumberLiteral,
	type NodeBigIntLiteralDissect,
	type NodeNumberLiteralDissect,
	type RuleData
} from "../_utility.ts";
export interface RuleFmtNumericSeparationOptions {
	/**
	 * Number of digits per separation, which apply to every numerics. Default to automatic per numeric.
	 * @default {null}
	 * @example
	 * ```ts
	 * ---
	 * digits: null
	 * ---
	 * 123456789n;
	 * 1_23_45_67_89n;
	 * 123_456_789n;
	 * 1_2345_6789n;
	 * 123456789;
	 * 1_23_45_67_89;
	 * 123_456_789;
	 * 1_2345_6789;
	 * ```
	 * @example
	 * ```ts
	 * ---
	 * digits: 3
	 * ---
	 * 123_456_789n;
	 * 123_456_789;
	 * ```
	 */
	digits?: number | null;
}
export const ruleData: RuleData = {
	identifier: "fmt-numeric-separation",
	tags: [
		"recommended"
	],
	querier(options: RuleFmtNumericSeparationOptions = {}): Deno.lint.Rule {
		const { digits = null }: RuleFmtNumericSeparationOptions = options;
		if (!(
			digits === null ||
			(Number.isSafeInteger(digits) && digits >= 1)
		)) {
			throw new RangeError(`Parameter \`digits\` is not \`null\`, or a number which is integer, safe, and > 0!`);
		}
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Literal(node: Deno.lint.Literal): void {
						if (isNodeBigIntLiteral(node)) {
							const {
								integer,
								integerIndexBegin
							}: NodeBigIntLiteralDissect = dissectNodeBigIntLiteral(node);
							if ((digits === null) ? integer.includes("_") : true) {
								const integerRaw: string = integer.replaceAll("_", "");
								const expectSplitLength: number = (digits === null) ? integer.slice(integer.lastIndexOf("_") + 1).length : digits;
								const expectSplitLengthFirst: number = integerRaw.length % expectSplitLength;
								const expectIntegersSplit: string[] = [];
								if (expectSplitLengthFirst > 0) {
									expectIntegersSplit.push(integerRaw.slice(0, expectSplitLengthFirst));
								}
								for (let cursor: number = expectSplitLengthFirst; cursor < integerRaw.length; cursor += expectSplitLength) {
									expectIntegersSplit.push(integerRaw.slice(cursor, cursor + expectSplitLength));
								}
								const expect: string = expectIntegersSplit.join("_");
								if (integer !== expect) {
									const rangeBegin: number = node.range[0] + integerIndexBegin;
									const range: Deno.lint.Range = [rangeBegin, rangeBegin + integer.length];
									context.report({
										range,
										message: `Require normalize the numeric separation.`,
										hint: `Do you mean \`${expect}\`?`,
										fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
											return fixer.replaceTextRange(range, expect);
										}
									});
								}
							}
						} else if (isNodeNumberLiteral(node)) {
							const {
								integer,
								integerIndexBegin
							}: NodeNumberLiteralDissect = dissectNodeNumberLiteral(node);
							if (integer !== null && ((digits === null) ? integer.includes("_") : true)) {
								const integerRaw: string = integer.replaceAll("_", "");
								const expectSplitLength: number = (digits === null) ? integer.slice(integer.lastIndexOf("_") + 1).length : digits;
								const expectSplitLengthFirst: number = integerRaw.length % expectSplitLength;
								const expectIntegersSplit: string[] = [];
								if (expectSplitLengthFirst > 0) {
									expectIntegersSplit.push(integerRaw.slice(0, expectSplitLengthFirst));
								}
								for (let cursor: number = expectSplitLengthFirst; cursor < integerRaw.length; cursor += expectSplitLength) {
									expectIntegersSplit.push(integerRaw.slice(cursor, cursor + expectSplitLength));
								}
								const expect: string = expectIntegersSplit.join("_");
								if (integer !== expect) {
									const rangeBegin: number = node.range[0] + integerIndexBegin!;
									const range: Deno.lint.Range = [rangeBegin, rangeBegin + integer.length];
									context.report({
										range,
										message: `Require normalize the numeric separation.`,
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
