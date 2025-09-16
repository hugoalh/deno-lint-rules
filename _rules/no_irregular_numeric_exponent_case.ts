import {
	dissectNodeNumberLiteral,
	isNodeNumberLiteral,
	type NodeNumberLiteralDissect,
	type RuleData
} from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "no-irregular-numeric-exponent-case",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Literal(node: Deno.lint.Literal): void {
						if (isNodeNumberLiteral(node)) {
							const {
								exponent, exponentIndexBegin
							}: NodeNumberLiteralDissect = dissectNodeNumberLiteral(node);
							if (exponent !== null && exponentIndexBegin !== null && exponent.startsWith("E")) {
								const rangeBegin: number = node.range[0] + exponentIndexBegin;
								const range: Deno.lint.Range = [rangeBegin, rangeBegin + 1];
								context.report({
									range,
									message: `Use of irregular numeric exponent case is forbidden.`,
									fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
										return fixer.replaceTextRange(range, "e");
									}
								});
							}
						}
					}
				};
			}
		};
	}
};
