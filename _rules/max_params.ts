import type { DenoLintRuleDataPre } from "../_template.ts";
export interface DenoLintRuleMaxParamsOptions {
	/**
	 * Maximum number of parameters per function/method definition.
	 * @default {4}
	 */
	maximum?: number;
}
function ruleAssertor(context: Deno.lint.RuleContext, options: Required<DenoLintRuleMaxParamsOptions>, node: Deno.lint.ArrowFunctionExpression | Deno.lint.FunctionDeclaration | Deno.lint.FunctionExpression | Deno.lint.TSDeclareFunction | Deno.lint.TSEmptyBodyFunctionExpression | Deno.lint.TSFunctionType): void {
	const { maximum }: Required<DenoLintRuleMaxParamsOptions> = options;
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
			throw new RangeError(`Parameter \`maximum\` is not a valid number which is integer, positive, and safe!`);
		}
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				const ruleAssertorBind = ruleAssertor.bind(null, context, { maximum });
				return {
					ArrowFunctionExpression(node: Deno.lint.ArrowFunctionExpression): void {
						ruleAssertorBind(node);
					},
					FunctionDeclaration(node: Deno.lint.FunctionDeclaration): void {
						ruleAssertorBind(node);
					},
					FunctionExpression(node: Deno.lint.FunctionExpression): void {
						ruleAssertorBind(node);
					},
					TSDeclareFunction(node: Deno.lint.TSDeclareFunction): void {
						ruleAssertorBind(node);
					},
					TSEmptyBodyFunctionExpression(node: Deno.lint.TSEmptyBodyFunctionExpression): void {
						ruleAssertorBind(node);
					},
					TSFunctionType(node: Deno.lint.TSFunctionType): void {
						ruleAssertorBind(node);
					}
				};
			}
		};
	}
};
