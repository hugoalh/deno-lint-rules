import type { RuleData } from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "prefer-interface",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					TSTypeAliasDeclaration(node: Deno.lint.TSTypeAliasDeclaration): void {
						if (node.typeAnnotation.type === "TSTypeLiteral") {
							const report: Deno.lint.ReportData = {
								node,
								message: `Prefer to use \`interface\` instead of \`type\`.`
							};
							if (context.sourceCode.getCommentsInside(node).length === 0) {
								const expect: string = `${node.declare ? "declare " : ""}interface ${context.sourceCode.getText(node.id)}${(typeof node.typeParameters === "undefined") ? "" : context.sourceCode.getText(node.typeParameters)} ${context.sourceCode.getText(node.typeAnnotation)}`;
								report.hint = `Do you mean \`${expect}\`?`;
								report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
									return fixer.replaceText(node, expect);
								};
							}
							context.report(report);
						}
					}
				};
			}
		};
	}
};
