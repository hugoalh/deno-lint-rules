import type { DenoLintRuleData } from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			ReturnStatement(node: Deno.lint.ReturnStatement): void {
				if (!(
					node.argument === null ||
					node.argument.type === "ThisExpression"
				)) {
					const ancestorsReverse: readonly Deno.lint.Node[] = context.sourceCode.getAncestors(node).reverse();
					for (let index: number = 0; index < ancestorsReverse.length; index += 1) {
						const current: Deno.lint.Node = ancestorsReverse[index];
						if (
							current.type === "ArrowFunctionExpression" ||
							current.type === "ClassBody" ||
							current.type === "ClassDeclaration" ||
							current.type === "ClassExpression" ||
							current.type === "FunctionDeclaration" ||
							current.type === "FunctionExpression" ||
							current.type === "Program" ||
							current.type === "TSClassImplements"
						) {
							break;
						}
						if (current.type === "BlockStatement") {
							const parent: Deno.lint.Node | undefined = ancestorsReverse[index + 1];
							const parent2: Deno.lint.Node | undefined = ancestorsReverse[index + 2];
							if (parent?.type === "FunctionExpression" && parent2?.type === "MethodDefinition" && parent2?.kind === "constructor") {
								context.report({
									node,
									message: `Return value in the class constructor is possibly mistake.`,
									fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
										return fixer.replaceText(node.argument!, "this");
									}
								});
							}
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
