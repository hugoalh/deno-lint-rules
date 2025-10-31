import {
	dissectNodeBigIntLiteral,
	dissectNodeNumberLiteral,
	isNodeBigIntLiteral,
	isNodeNumberLiteral,
	type NodeBigIntLiteralDissect,
	type NodeNumberLiteralDissect,
	type RuleData
} from "../_utility.ts";
function ruleAssertor(context: Deno.lint.RuleContext, node: Deno.lint.BigIntLiteral | Deno.lint.NumberLiteral, dissect: NodeBigIntLiteralDissect | NodeNumberLiteralDissect): void {
	const {
		integer,
		integerIndexBegin
	}: NodeBigIntLiteralDissect | NodeNumberLiteralDissect = dissect;
	if (integer.includes("_") && !integer.startsWith("_") && !integer.endsWith("_")) {
		const integerRaw: string = integer.replaceAll("_", "");
		const expectSplitLength: number = integer.slice(integer.lastIndexOf("_") + 1).length;
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
}
export const ruleData: RuleData = {
	identifier: "fmt-numeric-separation",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Literal(node: Deno.lint.Literal): void {
						if (isNodeBigIntLiteral(node)) {
							ruleAssertor(context, node, dissectNodeBigIntLiteral(node));
						} else if (isNodeNumberLiteral(node)) {
							ruleAssertor(context, node, dissectNodeNumberLiteral(node));
						}
					}
				};
			}
		};
	}
};
