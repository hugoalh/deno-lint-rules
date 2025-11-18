import {
	dissectNodeNumberLiteral,
	isNodeNumberLiteral,
	type NodeNumberLiteralDissect,
	type RuleData
} from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "no-float-dot-start",
	tags: [
		"no-float-dot",
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Literal(node: Deno.lint.Literal): void {
						if (isNodeNumberLiteral(node)) {
							const {
								integer,
								float
							}: NodeNumberLiteralDissect = dissectNodeNumberLiteral(node);
							if (float !== null && integer === null) {
								context.report({
									node,
									message: `Float without integer but with start dot (\`.\`) is forbidden.`,
									hint: `Do you mean \`0${node.raw}\`?`,
									fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
										return fixer.insertTextBefore(node, "0");
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
