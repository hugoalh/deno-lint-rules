import type { RuleData } from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "no-useless-catch",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					CatchClause(node: Deno.lint.CatchClause): void {
						if (node.param?.type === "Identifier" && node.body.body[0].type === "ThrowStatement" && node.body.body[0].argument.type === "Identifier" && node.body.body[0].argument.name === node.param.name) {
							context.report({
								node: node.body.body[0],
								message: `The \`catch\` statement is useless.`
							});
						}
					}
				};
			}
		};
	}
};
