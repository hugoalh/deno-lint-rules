import {
	dissectNodeNumberLiteral,
	isNodeNumberLiteral,
	type NodeNumberLiteralDissect,
	type RuleData
} from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "no-float-dot-lone",
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
								float,
								floatIndexBegin
							}: NodeNumberLiteralDissect = dissectNodeNumberLiteral(node);
							if (float === ".") {
								context.report({
									node,
									message: `Float with lone dot (\`.\`) is forbidden.`,
									hint: `Do you mean \`${node.raw.replace(".", "")}\`?`,
									fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
										const rangeFixBegin: number = node.range[0] + floatIndexBegin!;
										return fixer.removeRange([rangeFixBegin, rangeFixBegin + 1]);
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
