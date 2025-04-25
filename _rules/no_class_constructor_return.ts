import type { DenoLintRuleData } from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			ReturnStatement(node: Deno.lint.ReturnStatement): void {
				if (node.argument !== null) {
					const ancestors: readonly Deno.lint.Node[] = context.sourceCode.getAncestors(node).reverse();
					for (let index: number = 0; index < ancestors.length; index += 1) {
						const ancestor: Deno.lint.Node = ancestors[index];
						const ancestorOffset1: Deno.lint.Node | undefined = ancestors[index + 1];
						const ancestorOffset2: Deno.lint.Node | undefined = ancestors[index + 2];
						if (
							ancestor.type === "ArrowFunctionExpression" ||
							ancestor.type === "ClassBody" ||
							ancestor.type === "ClassDeclaration" ||
							ancestor.type === "ClassExpression" ||
							ancestor.type === "FunctionDeclaration" ||
							ancestor.type === "FunctionExpression" ||
							ancestor.type === "Program" ||
							ancestor.type === "TSClassImplements"
						) {
							break;
						}
						if (ancestor.type === "BlockStatement" && ancestorOffset1?.type === "FunctionExpression" && ancestorOffset2?.type === "MethodDefinition" && ancestorOffset2?.kind === "constructor") {
							context.report({
								node,
								message: `Return value in the class constructor is possibly mistake.`,
								fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
									return fixer.remove(node.argument!);
								}
							});
						}
					}
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
