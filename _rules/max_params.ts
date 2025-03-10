import type { DenoLintRuleDataPre } from "../_template.ts";
export interface DenoLintRuleMaxParamsOptions {
	/**
	 * Maximum number of parameters per function/method definition.
	 * @default {4}
	 */
	maximum?: number;
}
function ruleAssertor(context: Deno.lint.RuleContext, node: Deno.lint.ArrowFunctionExpression | Deno.lint.FunctionDeclaration | Deno.lint.FunctionExpression | Deno.lint.TSDeclareFunction | Deno.lint.TSEmptyBodyFunctionExpression | Deno.lint.TSFunctionType, maximum: number): void {
	if (node.params.length > maximum) {
		context.report({
			node,
			message: `Too many parameters; Expect: 0 ~ ${maximum}, Current: ${node.params.length}.`
		});
	}
}
export const data: DenoLintRuleDataPre<DenoLintRuleMaxParamsOptions> = {
	identifier: "max-params",
	context(options: DenoLintRuleMaxParamsOptions = {}): Deno.lint.Rule {
		const { maximum = 4 }: DenoLintRuleMaxParamsOptions = options;
		if (!(Number.isSafeInteger(maximum) && maximum >= 0)) {
			throw new RangeError(`Parameter \`options.maximum\` is not a valid number which is integer, positive, and safe!`);
		}
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ArrowFunctionExpression(node: Deno.lint.ArrowFunctionExpression): void {
						ruleAssertor(context, node, maximum);
					},
					FunctionDeclaration(node: Deno.lint.FunctionDeclaration): void {
						ruleAssertor(context, node, maximum);
					},
					FunctionExpression(node: Deno.lint.FunctionExpression): void {
						ruleAssertor(context, node, maximum);
					},
					TSDeclareFunction(node: Deno.lint.TSDeclareFunction): void {
						ruleAssertor(context, node, maximum);
					},
					TSEmptyBodyFunctionExpression(node: Deno.lint.TSEmptyBodyFunctionExpression): void {
						ruleAssertor(context, node, maximum);
					},
					TSFunctionType(node: Deno.lint.TSFunctionType): void {
						ruleAssertor(context, node, maximum);
					}
				};
			}
		};
	}
};
