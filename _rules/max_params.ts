import type { DenoLintRuleDataPre } from "../_template.ts";
export interface DenoLintRuleMaxParamsOptions {
	/**
	 * Maximum number of parameters per function/method definition.
	 * @default {4}
	 */
	count?: number;
}
function constructRuleMessage(expect: number, current: number): string {
	return `Too many parameters; Expect: 0 ~ ${expect}, Current: ${current}.`;
}
export const data: DenoLintRuleDataPre<DenoLintRuleMaxParamsOptions> = {
	identifier: "max-params",
	context(options: DenoLintRuleMaxParamsOptions = {}): Deno.lint.Rule {
		const { count = 4 }: DenoLintRuleMaxParamsOptions = options;
		if (!(Number.isSafeInteger(count) && count >= 0)) {
			throw new RangeError(`Parameter \`options.count\` is not a valid number which is integer, positive, and safe!`);
		}
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ArrowFunctionExpression(node: Deno.lint.ArrowFunctionExpression): void {
						if (node.params.length > count) {
							context.report({
								node,
								message: constructRuleMessage(count, node.params.length)
							});
						}
					},
					FunctionDeclaration(node: Deno.lint.FunctionDeclaration): void {
						if (node.params.length > count) {
							context.report({
								node,
								message: constructRuleMessage(count, node.params.length)
							});
						}
					},
					FunctionExpression(node: Deno.lint.FunctionExpression): void {
						if (node.params.length > count) {
							context.report({
								node,
								message: constructRuleMessage(count, node.params.length)
							});
						}
					},
					TSDeclareFunction(node: Deno.lint.TSDeclareFunction): void {
						if (node.params.length > count) {
							context.report({
								node,
								message: constructRuleMessage(count, node.params.length)
							});
						}
					},
					TSEmptyBodyFunctionExpression(node: Deno.lint.TSEmptyBodyFunctionExpression): void {
						if (node.params.length > count) {
							context.report({
								node,
								message: constructRuleMessage(count, node.params.length)
							});
						}
					},
					TSFunctionType(node: Deno.lint.TSFunctionType): void {
						if (node.params.length > count) {
							context.report({
								node,
								message: constructRuleMessage(count, node.params.length)
							});
						}
					}

				};
			}
		};
	}
};
