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
		base,
		baseSerialize
	}: NodeBigIntLiteralDissect | NodeNumberLiteralDissect = dissect;
	if (base !== null && baseSerialize !== null && base !== baseSerialize) {
		const range: Deno.lint.Range = [node.range[0], node.range[0] + base.length];
		context.report({
			range,
			message: `Use of irregular numeric base case is forbidden.`,
			hint: `Fix this to \`${baseSerialize}\`?`,
			fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
				return fixer.replaceTextRange(range, baseSerialize);
			}
		});
	}
}
export const ruleData: RuleData = {
	identifier: "no-irregular-numeric-base-case",
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
