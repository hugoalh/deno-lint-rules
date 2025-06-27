import {
	dissectNumericLiteral,
	isNodeBigIntLiteral,
	isNodeNumberLiteral,
	type NodeNumericLiteralDissectMeta,
	type RuleData
} from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			Literal(node: Deno.lint.Literal): void {
				if (
					isNodeBigIntLiteral(node) ||
					isNodeNumberLiteral(node)
				) {
					const {
						base,
						integer
					}: NodeNumericLiteralDissectMeta = dissectNumericLiteral(node);
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
							const range: Deno.lint.Range = [node.range[0] + ((base?.length) ?? 0), node.range[0] + ((base?.length) ?? 0) + integer.length];
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
			}
		};
	}
};
export const ruleData: RuleData = {
	identifier: "no-irregular-numeric-separation",
	sets: [
		"recommended"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
