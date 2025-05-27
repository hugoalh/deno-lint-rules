import {
	isNodeNumberLiteral,
	type RuleData
} from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			Literal(node: Deno.lint.Literal): void {
				// NOTE: No need to check the number whether is `NaN`, as `NaN` is an identifier.
				if (isNodeNumberLiteral(node) && (
					node.value < Number.MIN_SAFE_INTEGER ||
					node.value > Number.MAX_SAFE_INTEGER
				)) {
					context.report({
						node,
						message: `Number literals with values equal to 2^53 or greater are too large to be represented accurately.`
					});
				}
			}
		};
	}
};
export const ruleData: RuleData = {
	identifier: "no-unsafe-number",
	sets: [
		"recommended"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
