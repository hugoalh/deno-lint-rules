import {
	NodeSerializer,
	type RuleData
} from "../_utility.ts";
const serializer: NodeSerializer = new NodeSerializer();
function ruleReporterSameResult(context: Deno.lint.RuleContext, node: Deno.lint.ConditionalExpression): void {
	context.report({
		node: node,
		message: `Ternary with same result is useless.`,
		fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
			return fixer.replaceText(node, context.sourceCode.getText(node.consequent));
		}
	});
}
export const ruleData: RuleData = {
	identifier: "no-useless-ternary",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ConditionalExpression(node: Deno.lint.ConditionalExpression): void {
						if (node.consequent.type === "Literal" && node.alternate.type === "Literal") {
							if (node.consequent.value === node.alternate.value) {
								ruleReporterSameResult(context, node);
							} else if (typeof node.consequent.value === "boolean" && typeof node.alternate.value === "boolean") {
								// NOTE: It is impossible to have cases of `x ? true : true` or `x ? false : false` at here, which already handled by the previous condition.
								const target: string = context.sourceCode.getText(node.test);
								const targetNeedWrap: boolean = !(
									node.test.type === "BinaryExpression" ||
									node.test.type === "LogicalExpression"
								);
								const targetWrap: string = targetNeedWrap ? `Boolean(${target})` : target;
								const result: string = (node.consequent.value && !node.alternate.value) ? targetWrap : `!${targetNeedWrap ? targetWrap : `(${targetWrap})`}`;
								context.report({
									node,
									message: `Ternary with boolean result is useless.`,
									fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
										return fixer.replaceText(node, result);
									}
								});
							}
						} else if (serializer.for(node.consequent) === serializer.for(node.alternate)) {
							// NOTE: This section is intended to duplicate the equals literal part to prevent slow node serialize issue.
							ruleReporterSameResult(context, node);
						}
					}
				};
			}
		};
	}
};
