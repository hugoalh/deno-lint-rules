import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			ClassBody(node: Deno.lint.ClassBody): void {
				for (const body of node.body) {
					if (body.type === "MethodDefinition" && body.kind === "constructor" && body.value.body?.type === "BlockStatement" && body.value.body.body.length === 0) {
						const [blockBegin, blockEnd]: Deno.lint.Range = body.value.body.range;
						if ((context.sourceCode.text.slice(blockBegin + 1, blockEnd - 1)).trim().length === 0) {
							context.report({
								node: body,
								message: `Empty class constructor is forbidden. While not technically errors, which cause confusion when reading code.`,
								fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
									return fixer.remove(body);
								}
							});
						}
					}
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-useless-class-constructor",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContextStatic;
	}
};
