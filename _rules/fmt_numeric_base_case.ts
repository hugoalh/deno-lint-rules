import {
	dissectNodeBigIntLiteral,
	dissectNodeNumberLiteral,
	isNodeBigIntLiteral,
	isNodeNumberLiteral,
	type NodeBigIntLiteralDissect,
	type NodeNumberLiteralDissect,
	type RuleConstructContext
} from "../_utility.ts";
function ruleAssertor(context: Deno.lint.RuleContext, node: Deno.lint.BigIntLiteral | Deno.lint.NumberLiteral, dissect: NodeBigIntLiteralDissect | NodeNumberLiteralDissect): void {
	const { base }: NodeBigIntLiteralDissect | NodeNumberLiteralDissect = dissect;
	if (typeof base !== "undefined") {
		const expect: string = base.value.toLowerCase();
		if (base.value !== expect) {
			const rangeBegin: number = node.range[0] + base.index;
			const range: Deno.lint.Range = [rangeBegin, rangeBegin + base.value.length];
			context.report({
				range,
				message: `Require normalize the case of the numeric base to lower case.`,
				hint: `Do you mean \`${expect}\`?`,
				fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
					return fixer.replaceTextRange(range, expect);
				}
			});
		}
	}
}
export default {
	identifier: "fmt-numeric-base-case",
	tags: [
		"fmt",
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Literal(node: Deno.lint.Literal): void {
						if (isNodeBigIntLiteral(node)) {
							const dissect: NodeBigIntLiteralDissect | undefined = dissectNodeBigIntLiteral(node);
							if (typeof dissect !== "undefined") {
								ruleAssertor(context, node, dissect);
							}
						} else if (isNodeNumberLiteral(node)) {
							const dissect: NodeNumberLiteralDissect | undefined = dissectNodeNumberLiteral(node);
							if (typeof dissect !== "undefined") {
								ruleAssertor(context, node, dissect);
							}
						}
					}
				};
			}
		};
	}
} satisfies RuleConstructContext as RuleConstructContext;
