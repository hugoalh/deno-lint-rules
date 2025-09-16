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
		const expectIntegersSplitLength: number = integer.slice(integer.lastIndexOf("_") + 1).length;
		const expectIntegersSplitLengthFirst: number = integerRaw.length % expectIntegersSplitLength;
		const expectIntegersSplit: string[] = [];
		if (expectIntegersSplitLengthFirst > 0) {
			expectIntegersSplit.push(integerRaw.slice(0, expectIntegersSplitLengthFirst));
		}
		for (let cursor: number = expectIntegersSplitLengthFirst; cursor < integerRaw.length; cursor += expectIntegersSplitLength) {
			expectIntegersSplit.push(integerRaw.slice(cursor, cursor + expectIntegersSplitLength));
		}
		const expectInteger: string = expectIntegersSplit.join("_");
		if (integer !== expectInteger) {
			const rangeBegin: number = node.range[0] + integerIndexBegin;
			const range: Deno.lint.Range = [rangeBegin, rangeBegin + integer.length];
			context.report({
				range,
				message: `Use of irregular numeric separation is forbidden.`,
				hint: `Fix this to \`${expectInteger}\`?`,
				fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
					return fixer.replaceTextRange(range, expectInteger);
				}
			});
		}
	}
}
export const ruleData: RuleData = {
	identifier: "no-irregular-numeric-separation",
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
