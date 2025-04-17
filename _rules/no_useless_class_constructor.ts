import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			MethodDefinition(node: Deno.lint.MethodDefinition): void {
				if (node.kind === "constructor" && node.value.body?.type === "BlockStatement" && node.value.body.body.length === 0) {
					context.report({
						node,
						message: `Empty class constructor is useless.`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
							return fixer.remove(node);
						}
					});
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-useless-class-constructor",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
