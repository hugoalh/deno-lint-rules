import {
	dissectNodeNumberLiteral,
	isNodeNumberLiteral,
	type NodeNumberLiteralDissect,
	type RuleData
} from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "fmt-numeric-exponent-case",
	tags: [
		"fmt",
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Literal(node: Deno.lint.Literal): void {
						if (isNodeNumberLiteral(node)) {
							const {
								exponent,
								exponentIndexBegin
							}: NodeNumberLiteralDissect = dissectNodeNumberLiteral(node);
							if (exponent !== null) {
								const expect: string = exponent.toLowerCase();
								if (exponent !== expect) {
									const rangeBegin: number = node.range[0] + exponentIndexBegin!;
									const range: Deno.lint.Range = [rangeBegin, rangeBegin + exponent.length];
									context.report({
										range,
										message: `Require normalize the case of the numeric exponent to lower case.`,
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
