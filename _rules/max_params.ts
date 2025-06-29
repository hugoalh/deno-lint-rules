import type { RuleData } from "../_utility.ts";
export interface RuleMaxParamsOptions {
	/**
	 * Maximum number of parameters per function/method definition.
	 * @default {4}
	 */
	maximum?: number;
}
function ruleAssertor(options: Required<RuleMaxParamsOptions>, context: Deno.lint.RuleContext, node: Deno.lint.ArrowFunctionExpression | Deno.lint.FunctionDeclaration | Deno.lint.FunctionExpression | Deno.lint.TSDeclareFunction | Deno.lint.TSEmptyBodyFunctionExpression | Deno.lint.TSFunctionType): void {
	const { maximum }: Required<RuleMaxParamsOptions> = options;
	if (node.params.length > maximum) {
		context.report({
			node,
			message: `Too many parameters; Maximum: ${maximum}, Current: ${node.params.length}.`
		});
	}
}
export const ruleData: RuleData<RuleMaxParamsOptions> = {
	identifier: "max-params",
	context(options: RuleMaxParamsOptions = {}): Deno.lint.Rule {
		const { maximum = 4 }: RuleMaxParamsOptions = options;
		if (!(Number.isSafeInteger(maximum) && maximum >= 0)) {
			throw new RangeError(`Parameter \`maximum\` is not a valid number which is integer, positive, and safe!`);
		}
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				const ruleAssertorBind = ruleAssertor.bind(null, { maximum }, context);
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
