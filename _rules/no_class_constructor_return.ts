import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			MethodDefinition(node: Deno.lint.MethodDefinition): void {
				if (node.kind === "constructor" && node.value.body !== null) {
					context.report({
						node,
						message: `Empty class constructor is useless.`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
							return fixer.remove(node);
						}
					});
				}
			},
			ReturnStatement(node: Deno.lint.ReturnStatement): void {
				if (node.argument !== null) {
					let parent: Deno.lint.Node | Deno.lint.TSParameterProperty = node.parent as Deno.lint.Node | Deno.lint.TSParameterProperty;
					while (true) {
						if (
							parent.type === "ArrowFunctionExpression" ||
							parent.type === "ClassBody" ||
							parent.type === "ClassDeclaration" ||
							parent.type === "ClassExpression" ||
							parent.type === "FunctionDeclaration" ||
							parent.type === "FunctionExpression" ||
							parent.type === "Program" ||
							parent.type === "TSClassImplements"
						) {
							break;
						}
						if (parent.type === "MethodDefinition" && parent.kind === "constructor") {
							context.report({
								node,
								message: `Return value in the class constructor is possibly mistake.`,
								fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
									return fixer.remove(node.argument!);
								}
							});
							break;
						}
						parent = parent.parent;
					}
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-class-constructor-return",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
