import {
	dissectNodeNumberLiteral,
	isNodeNumberLiteral,
	type NodeNumberLiteralDissect,
	type RuleData
} from "../_utility.ts";
const regexpUselessExponent = /^[Ee][+\-]?0+$/;
export const ruleData: RuleData = {
	identifier: "no-useless-numeric-exponent",
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
								exponent,
								exponentIndexBegin
							}: NodeNumberLiteralDissect = dissectNodeNumberLiteral(node);
							if (exponent !== null && regexpUselessExponent.test(exponent)) {
								const rangeBegin: number = node.range[0] + exponentIndexBegin!;
								const range: Deno.lint.Range = [rangeBegin, rangeBegin + exponent.length];
								context.report({
									range,
									message: `The numeric exponent is useless.`,
									hint: `Do you mean \`${node.raw.replace(exponent, "")}\`?`,
									fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
										return fixer.replaceTextRange(range, "");
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
