import type { RuleData } from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "no-class-constructor-return",
	tags: [
		"mistake",
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ReturnStatement(node: Deno.lint.ReturnStatement): void {
						if (!(
							node.argument === null ||
							node.argument.type === "ThisExpression"
						)) {
							const ancestors: readonly Deno.lint.Node[] = context.sourceCode.getAncestors(node);
							const indexClassConstructor: number = ancestors.findLastIndex((ancestor: Deno.lint.Node): boolean => {
								return (ancestor.type === "MethodDefinition" && ancestor.kind === "constructor");
							});
							if (indexClassConstructor >= 0 && ancestors[indexClassConstructor + 1]?.type === "FunctionExpression" && ancestors[indexClassConstructor + 2]?.type === "BlockStatement" && !ancestors.slice(indexClassConstructor + 3).some(({ type }: Deno.lint.Node): boolean => {
								return (
									type === "ArrowFunctionExpression" ||
									type === "FunctionDeclaration" ||
									type === "FunctionExpression"
								);
							})) {
								const report: Deno.lint.ReportData = {
									node,
									message: `\`return\` statement with value in the class constructor is possibly mistake.`
								};
								if (context.sourceCode.getCommentsInside(node.argument).length === 0) {
									report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
										return fixer.remove(node.argument!);
									};
								}
								context.report(report);
							}
						}
					}
				};
			}
		};
	}
};
