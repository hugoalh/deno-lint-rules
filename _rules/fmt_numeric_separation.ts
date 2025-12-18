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
function ruleAssertorInteger(options: Required<RuleFmtNumericSeparationOptions>, context: Deno.lint.RuleContext, node: Deno.lint.BigIntLiteral | Deno.lint.NumberLiteral, integer: string, integerIndexBegin: number): void {
	const { digits }: Required<RuleFmtNumericSeparationOptions> = options;
	if ((digits === null) ? integer.includes("_") : true) {
		const integerRaw: string = integer.replaceAll("_", "");
		const expectSplitLength: number = (digits === null) ? integer.slice(integer.lastIndexOf("_") + 1).length : digits;
		const expectIntegersSplit: string[] = [];
		const expectSplitLengthFirst: number = integerRaw.length % expectSplitLength;
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
}
export const ruleData: RuleData = {
	identifier: "fmt-numeric-separation",
	tags: [
		"fmt",
		"recommended"
	],
	querier(options: RuleFmtNumericSeparationOptions = {}): Deno.lint.Rule {
		const { digits = null }: RuleFmtNumericSeparationOptions = options;
		if (!(
			digits === null ||
			(Number.isSafeInteger(digits) && digits >= 1)
		)) {
			throw new RangeError(`Parameter \`digits\` is not \`null\`, or a number which is integer, safe, and >= 1!`);
		}
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				const ruleAssertorIntegerBind = ruleAssertorInteger.bind(null, { digits }, context);
				return {
					Literal(node: Deno.lint.Literal): void {
						if (isNodeBigIntLiteral(node)) {
							const {
								integer,
								integerIndexBegin
							}: NodeBigIntLiteralDissect = dissectNodeBigIntLiteral(node);
							ruleAssertorIntegerBind(node, integer, integerIndexBegin);
						} else if (isNodeNumberLiteral(node)) {
							const {
								exponent,
								float,
								integer,
								integerIndexBegin
							}: NodeNumberLiteralDissect = dissectNodeNumberLiteral(node);
							if (integer !== null && exponent === null && float === null) {
								ruleAssertorIntegerBind(node, integer, integerIndexBegin!);
							} else if (((digits === null) ? (
								exponent?.includes("_") ||
								float?.includes("_") ||
								integer?.includes("_")
							) : true)) {
								const exponentRaw: string | null = (exponent === null) ? null : exponent.replaceAll("_", "");
								const floatRaw: string | null = (float === null) ? null : float.replaceAll("_", "");
								const integerRaw: string | null = (integer === null) ? null : integer.replaceAll("_", "");
								const expectSplitLength: number = (digits === null) ? (
									integer?.includes("_") ? integer.slice(integer.lastIndexOf("_") + 1).length : (
										float?.includes("_") ? float.slice(1, float.indexOf("_")).length : (
											exponent?.includes("_") ? exponent.slice(exponent.lastIndexOf("_") + 1).length : 0 // NOTE: 0 is not possible, only for fulfill.
										)
									)
								) : digits;
								const expectIntegersSplit: string[] = [];
								if (integerRaw !== null) {
									const expectSplitLengthFirst: number = integerRaw.length % expectSplitLength;
									if (expectSplitLengthFirst > 0) {
										expectIntegersSplit.push(integerRaw.slice(0, expectSplitLengthFirst));
									}
									for (let cursor: number = expectSplitLengthFirst; cursor < integerRaw.length; cursor += expectSplitLength) {
										expectIntegersSplit.push(integerRaw.slice(cursor, cursor + expectSplitLength));
									}
								}
								const expectFloatsSplit: string[] = [];
								if (floatRaw !== null) {
									if (floatRaw === ".") {
										expectFloatsSplit.push(".");
									} else {
										const expectSplitLengthLast: number = (floatRaw.length - 1) % expectSplitLength;
										for (let cursor: number = 1; cursor + expectSplitLength < floatRaw.length; cursor += expectSplitLength) {
											expectFloatsSplit.push(floatRaw.slice(cursor, cursor + expectSplitLength));
										}
										if (expectSplitLengthLast > 0) {
											expectFloatsSplit.push(floatRaw.slice(1 + expectFloatsSplit.length * expectSplitLength));
										}
										expectFloatsSplit[0] = `.${expectFloatsSplit[0]}`;
									}
								}
								const expectExponentsSplit: string[] = [];
								if (exponentRaw !== null) {
									let prefix: string;
									let suffix: string;
									if (
										exponentRaw.includes("+") ||
										exponentRaw.includes("-")
									) {
										prefix = exponentRaw.slice(0, 2);
										suffix = exponentRaw.slice(2);
									} else {
										prefix = exponentRaw.slice(0, 1);
										suffix = exponentRaw.slice(1);
									}
									const expectSplitLengthFirst: number = suffix.length % expectSplitLength;
									if (expectSplitLengthFirst > 0) {
										expectExponentsSplit.push(suffix.slice(0, expectSplitLengthFirst));
									}
									for (let cursor: number = expectSplitLengthFirst; cursor < suffix.length; cursor += expectSplitLength) {
										expectExponentsSplit.push(suffix.slice(cursor, cursor + expectSplitLength));
									}
									expectExponentsSplit[0] = `${prefix}${expectExponentsSplit[0]}`;
								}
								const raw: string = `${integer ?? ""}${float ?? ""}${exponent ?? ""}`;
								const expect: string = `${expectIntegersSplit.join("_")}${expectFloatsSplit.join("_")}${expectExponentsSplit.join("_")}`;
								if (raw !== expect) {
									const rangeBegin: number = node.range[0] + integerIndexBegin!;
									const range: Deno.lint.Range = [rangeBegin, rangeBegin + raw.length];
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
