import {
	dissectNumericLiteral,
	isNodeBigIntLiteral,
	isNodeNumberLiteral,
	type NumericLiteralDissect,
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
						baseFmt
					}: NumericLiteralDissect = dissectNumericLiteral(node);
					if (base !== null && baseFmt !== null && base !== baseFmt) {
						const range: Deno.lint.Range = [node.range[0], node.range[0] + base.length];
						context.report({
							range,
							message: `Use of irregular numeric base case is forbidden.`,
							hint: `Fix this to \`${baseFmt}\`?`,
							fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
								return fixer.replaceTextRange(range, baseFmt);
							}
						});
					}
				}
			}
		};
	}
};
export const ruleData: RuleData = {
	identifier: "no-irregular-numeric-base-case",
	sets: [
		"recommended"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
