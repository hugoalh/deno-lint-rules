import type { RuleData } from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "no-useless-class-constructor",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					MethodDefinition(node: Deno.lint.MethodDefinition): void {
						if (node.kind === "constructor" && node.value.body !== null) {
							const constructorBody: readonly Deno.lint.Statement[] = node.value.body.body;
							if (constructorBody.length === 0) {
								context.report({
									node,
									message: `Empty class constructor is useless.`,
									fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
										return fixer.remove(node);
									}
								});
							} else if (constructorBody.length === 1 && constructorBody[0].type === "ExpressionStatement" && constructorBody[0].expression.type === "CallExpression" && constructorBody[0].expression.callee.type === "Super" && constructorBody[0].expression.arguments.length === 0) {
								context.report({
									node,
									message: `Class constructor with empty \`super\` call is useless.`,
									fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
										return fixer.remove(node);
									}
								});
							}
						}
					}
				};
			}
		};
	}
};
