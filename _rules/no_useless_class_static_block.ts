import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			StaticBlock(node: Deno.lint.StaticBlock): void {
				if ((node.body as unknown as Deno.lint.Statement).type === "BlockStatement" && (node.body as unknown as Deno.lint.BlockStatement).body.length === 0) {
					context.report({
						node,
						message: `Empty class static block is useless hence forbidden.`,
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
	identifier: "no-useless-class-static-block",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
