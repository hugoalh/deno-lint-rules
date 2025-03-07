import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			ExpressionStatement(node: Deno.lint.ExpressionStatement): void {
				if (node.expression.type === "Literal" && node.expression.value === "use strict") {
					context.report({
						node,
						message: `Use of \`${node.expression.raw}\` directive is unnecessary, as ECMAScript modules always have strict mode semantics.`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
							return fixer.remove(node);
						}
					});
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-use-strict",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContextStatic;
	}
};
