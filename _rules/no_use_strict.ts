import {
	isStringLiteral,
	type DenoLintRuleData
} from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			ExpressionStatement(node: Deno.lint.ExpressionStatement): void {
				if (isStringLiteral(node.expression) && node.expression.value === "use strict") {
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
export const ruleData: DenoLintRuleData = {
	identifier: "no-use-strict",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
