import {
	getNodeCommentsFromRange,
	type RuleConstructContext
} from "../_utility.ts";
const ruleMessage: string = `The comment locate between major syntax is forbidden.`;
function ruleAssertorGeneral(context: Deno.lint.RuleContext, range: Deno.lint.Range): void {
	for (const comment of getNodeCommentsFromRange(context, range)) {
		context.report({
			node: comment,
			message: ruleMessage
		});
	}
}
export default {
	identifier: "no-bad-comment-location",
	tags: [
		"recommended",
		"security"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					AwaitExpression(node: Deno.lint.AwaitExpression): void {
						ruleAssertorGeneral(context, [node.range[0], node.argument.range[0]]);
					},
					BinaryExpression(node: Deno.lint.BinaryExpression): void {
						if (
							node.operator === "!=" ||
							node.operator === "!==" ||
							node.operator === "==" ||
							node.operator === "===" ||
							node.operator === "in" ||
							node.operator === "instanceof"
						) {
							ruleAssertorGeneral(context, [node.left.range[1], node.right.range[0]]);
						}
					},
					BreakStatement(node: Deno.lint.BreakStatement): void {
						if (node.label !== null) {
							ruleAssertorGeneral(context, [node.range[0], node.label.range[0]]);
						}
					},
					ContinueStatement(node: Deno.lint.ContinueStatement): void {
						if (node.label !== null) {
							ruleAssertorGeneral(context, [node.range[0], node.label.range[0]]);
						}
					},
					ClassDeclaration(node: Deno.lint.ClassDeclaration): void {
						ruleAssertorGeneral(context, [node.range[0], node.body.range[0]]);
					},
					Decorator(node: Deno.lint.Decorator): void {
						ruleAssertorGeneral(context, [node.range[0], node.expression.range[0]]);
					},
					ExportDefaultDeclaration(node: Deno.lint.ExportDefaultDeclaration): void {
						ruleAssertorGeneral(context, [node.range[0], node.declaration.range[0]]);
					},
					ExportNamedDeclaration(node: Deno.lint.ExportNamedDeclaration): void {
						if (node.declaration !== null) {
							ruleAssertorGeneral(context, [node.range[0], node.declaration.range[0]]);
						}
					},
					MethodDefinition(node: Deno.lint.MethodDefinition): void {
						ruleAssertorGeneral(context, [node.range[0], node.value.range[0]]);
					},
					NewExpression(node: Deno.lint.NewExpression): void {
						ruleAssertorGeneral(context, [node.range[0], node.callee.range[0]]);
					},
					ReturnStatement(node: Deno.lint.ReturnStatement): void {
						if (node.argument !== null) {
							ruleAssertorGeneral(context, [node.range[0], node.argument.range[0]]);
						}
					},
					TSEnumDeclaration(node: Deno.lint.TSEnumDeclaration): void {
						ruleAssertorGeneral(context, [node.range[0], node.body.range[0]]);
					},
					TSInterfaceDeclaration(node: Deno.lint.TSInterfaceDeclaration): void {
						ruleAssertorGeneral(context, [node.range[0], node.body.range[0]]);
					},
					TSModuleDeclaration(node: Deno.lint.TSModuleDeclaration): void {
						ruleAssertorGeneral(context, [node.range[0], node.body?.range[0] ?? node.id.range[0]]);
					},
					TSNonNullExpression(node: Deno.lint.TSNonNullExpression): void {
						ruleAssertorGeneral(context, [node.expression.range[1], node.range[1]]);
					},
					TSQualifiedName(node: Deno.lint.TSQualifiedName): void {
						if (node.parent.type !== "TSQualifiedName") {
							ruleAssertorGeneral(context, node.range);
						}
					},
					TSTypeAliasDeclaration(node: Deno.lint.TSTypeAliasDeclaration): void {
						ruleAssertorGeneral(context, [node.range[0], node.typeAnnotation.range[0]]);
					},
					UnaryExpression(node: Deno.lint.UnaryExpression): void {
						ruleAssertorGeneral(context, [node.range[0], node.argument.range[0]]);
					},
					VariableDeclaration(node: Deno.lint.VariableDeclaration): void {
						ruleAssertorGeneral(context, [node.range[0], node.declarations[0].range[0]]);
					},
					YieldExpression(node: Deno.lint.YieldExpression): void {
						if (node.argument !== null) {
							ruleAssertorGeneral(context, [node.range[0], node.argument.range[0]]);
						}
					}
				};
			}
		};
	}
} satisfies RuleConstructContext as RuleConstructContext;
