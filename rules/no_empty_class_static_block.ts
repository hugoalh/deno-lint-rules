import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			StaticBlock(node: Deno.lint.StaticBlock): void {
				//@ts-expect-error Deno provide wrong type.
				if (node.body.type === "BlockStatement" && node.body.body.length === 0) {
					//@ts-expect-error Deno provide wrong type.
					const [blockBegin, blockEnd]: Deno.lint.Range = node.body.range;
					if ((context.sourceCode.text.slice(blockBegin + 1, blockEnd - 1)).trim().length === 0) {
						context.report({
							node,
							message: `Empty class static block is forbidden. While not technically errors, which cause confusion when reading code.`,
							fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
								return fixer.remove(node);
							}
						});
					}
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-empty-class-static-block",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContextStatic;
	}
};
