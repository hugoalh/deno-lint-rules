import {
	dissectNodeNumberLiteral,
	isNodeNumberLiteral,
	type NodeNumberLiteralDissect,
	type RuleConstructContext
} from "../_utility.ts";
export default {
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
							const dissect: NodeNumberLiteralDissect | undefined = dissectNodeNumberLiteral(node);
							if (typeof dissect !== "undefined") {
								const { exponent }: NodeNumberLiteralDissect = dissect;
								if (typeof exponent !== "undefined") {
									const expect: string = exponent.value.toLowerCase();
									if (exponent.value !== expect) {
										const rangeBegin: number = node.range[0] + exponent.index;
										const range: Deno.lint.Range = [rangeBegin, rangeBegin + exponent.value.length];
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
					}
				};
			}
		};
	}
} satisfies RuleConstructContext as RuleConstructContext;
