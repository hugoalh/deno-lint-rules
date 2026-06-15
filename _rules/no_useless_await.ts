import {
	isNodeHasOperation,
	type RuleConstructContext
} from "../_utility.ts";
export default {
	identifier: "no-useless-await",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					AwaitExpression(node: Deno.lint.AwaitExpression): void {
						if ((node.argument.type === "Identifier") ? (
							node.argument.name === "Infinity" ||
							node.argument.name === "NaN" ||
							node.argument.name === "undefined"
						) : !isNodeHasOperation(node.argument)) {
							context.report({
								node,
								message: `\`await\` will not have any effect with this expression.`
							});
						}
					}
				};
			}
		};
	}
} satisfies RuleConstructContext as RuleConstructContext;
