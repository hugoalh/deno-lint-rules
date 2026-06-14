import type { RuleConstructContext } from "../_utility.ts";
export default {
	identifier: "no-useless-else",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					IfStatement(node: Deno.lint.IfStatement): void {
						if (node.alternate !== null) {
							const consequentNodeLastType: Deno.lint.Node["type"] | undefined = (node.consequent.type === "BlockStatement") ? node.consequent.body.at(-1)?.type : node.consequent.type;
							switch (consequentNodeLastType) {
								case "BreakStatement":
								case "ContinueStatement":
								case "ReturnStatement":
								case "ThrowStatement":
									context.report({
										node,
										message: `The \`if\` statement has the \`${consequentNodeLastType.replace("Statement", "").toLowerCase()}\` statement at the end, thus the \`else\` statement become unnecessary.`
									});
									break;
							}
						}
					}
				};
			}
		};
	}
} satisfies RuleConstructContext as RuleConstructContext;
