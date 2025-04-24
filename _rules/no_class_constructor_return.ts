import type { DenoLintRuleData } from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			"MethodDefinition[kind=\"constructor\"] ReturnStatement"(node: Deno.lint.ReturnStatement): void {
				if (node.argument !== null) {
					context.report({
						node,
						message: `Return value in the class constructor is possibly mistake.`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
							return fixer.remove(node.argument!);
						}
					});
				}
			}
		};
	}
};
export const ruleData: DenoLintRuleData = {
	identifier: "no-class-constructor-return",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
