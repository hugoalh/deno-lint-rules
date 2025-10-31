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
	const { base }: NodeBigIntLiteralDissect | NodeNumberLiteralDissect = dissect;
	if (base !== null) {
		const expect: string = base.toLowerCase();
		if (base !== expect) {
			const range: Deno.lint.Range = [node.range[0], node.range[0] + base.length];
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
export const ruleData: RuleData = {
	identifier: "fmt-numeric-base-case",
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
