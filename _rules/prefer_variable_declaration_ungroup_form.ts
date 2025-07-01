import type { RuleData } from "../_utility.ts";
// export interface RulePreferVariableDeclarationFormOptions {
// 	/**
// 	 * Whether prefer group adjacent variable declarations.
// 	 * @default {false}
// 	 */
// 	group?: boolean;
// }
// function ruleAssertorGroup(context: Deno.lint.RuleContext, statements: readonly Deno.lint.Statement[]): void {
// 	for (let i: number = 0; i < statements.length; i += 1) {
// 		const statementI: Deno.lint.Statement = statements[i];
// 		if (statementI.type === "ExportNamedDeclaration" && statementI.declaration?.type === "VariableDeclaration") {
// 			const group: Deno.lint.ExportNamedDeclaration[] = [statementI];
// 			for (let j: number = i; j < statements.length; j += 1) {
// 				const statementJ: Deno.lint.Statement = statements[j];
// 				if (!(statementJ.type === "ExportNamedDeclaration" && statementJ.declaration?.type === "VariableDeclaration" && statementJ.declaration.kind === statementI.declaration.kind)) {
// 					break;
// 				}
// 				group.push(statementJ);
// 			}
// 			if (group.length > 1) {
// 				const range: Deno.lint.Range = [group[0].range[0], group[group.length - 1].range[1]];
// 				const report: Deno.lint.ReportData = {
// 					range,
// 					message: `Prefer declare variables in group form.`
// 				};
// 			}
// 		}
// 	}
// }
// const ruleContextGroup: Deno.lint.Rule = {
// 	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
// 		return {
// 			BlockStatement(node: Deno.lint.BlockStatement): void {
// 				ruleAssertorGroup(context, node.body);
// 			},
// 			Program(node: Deno.lint.Program): void {
// 				ruleAssertorGroup(context, node.body);
// 			}
// 		};
// 	}
// };
const ruleContextUngroup: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			VariableDeclaration(node: Deno.lint.VariableDeclaration): void {
				if (node.declarations.length > 1 && (
					node.kind === "const" ||
					node.kind === "let" ||
					node.kind === "var"
				) && !(
					node.parent.type === "ForInStatement" ||
					node.parent.type === "ForOfStatement" ||
					node.parent.type === "ForStatement"
				)) {
					const report: Deno.lint.ReportData = {
						node,
						message: `Prefer declare variables in ungroup form.`
					};
					if (context.sourceCode.getCommentsInside(node).length === 0) {
						report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
							return fixer.replaceText(node, node.declarations.map((declaration: Deno.lint.VariableDeclarator): string => {
								return `${node.kind} ${context.sourceCode.getText(declaration)};`;
							}).join(" "));
						};
					}
					context.report(report);
				}
			}
		};
	}
};
export const ruleData: RuleData = {
	identifier: "prefer-variable-declaration-ungroup-form",
	context(): Deno.lint.Rule {
		return ruleContextUngroup;
	}
};
