import type { RuleData } from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			StaticBlock(node: Deno.lint.StaticBlock): void {
				if ((node.body as unknown as Deno.lint.Statement).type === "BlockStatement" && (node.body as unknown as Deno.lint.BlockStatement).body.length === 0) {
					context.report({
						node,
						message: `Empty class static block is useless.`,
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
	identifier: "no-useless-class-static-block",
	sets: [
		"recommended"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
