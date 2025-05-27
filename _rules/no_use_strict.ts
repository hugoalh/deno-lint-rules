import {
	isNodeStringLiteral,
	type RuleData
} from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			ExpressionStatement(node: Deno.lint.ExpressionStatement): void {
				if (isNodeStringLiteral(node.expression) && node.expression.value === "use strict") {
					context.report({
						node,
						message: `Use of \`use strict\` directive is unnecessary as ECMAScript modules always have strict mode semantics.`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
							return fixer.remove(node);
						}
					});
				}
			}
		};
	}
};
export const ruleData: RuleData = {
	identifier: "no-use-strict",
	sets: [
		"recommended"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
