import {
	isNodeStringLiteral,
	type RuleConstructContext
} from "../_utility.ts";
export default {
	identifier: "no-use-strict",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ExpressionStatement(node: Deno.lint.ExpressionStatement): void {
						if (isNodeStringLiteral(node.expression) && node.expression.value === "use strict") {
							context.report({
								node,
								message: `Use of \`use strict\` directive is forbidden. ECMAScript modules always have strict mode semantics.`,
								fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
									return fixer.remove(node);
								}
							});
						}
					}
				};
			}
		};
	}
} as RuleConstructContext;
