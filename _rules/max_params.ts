import type { DenoLintRuleData } from "../_utility.ts";
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
			message: `Too many parameters; Maximum: ${maximum}, Current: ${node.params.length}.`
		});
	}
}
export const ruleData: DenoLintRuleData<DenoLintRuleMaxParamsOptions> = {
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
					ArrowFunctionExpression: ruleAssertorBind,
					FunctionDeclaration: ruleAssertorBind,
					FunctionExpression: ruleAssertorBind,
					TSDeclareFunction: ruleAssertorBind,
					TSEmptyBodyFunctionExpression: ruleAssertorBind,
					TSFunctionType: ruleAssertorBind
				};
			}
		};
	}
};
