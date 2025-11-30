import {
	isNodeNumberLiteral,
	isNodeStringLiteral,
	type RuleData
} from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "no-enum-mix-value-type",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					TSEnumDeclaration(node: Deno.lint.TSEnumDeclaration): void {
						let countNumber: number = 0;
						let countString: number = 0;
						for (const { initializer } of node.body.members) {
							if (
								typeof initializer === "undefined" ||
								isNodeNumberLiteral(initializer)
							) {
								countNumber += 1;
							} else if (isNodeStringLiteral(initializer)) {
								countString += 1;
							}
						}
						if (countNumber > 0 && countString > 0) {
							context.report({
								node,
								message: `Use of \`enum\` with mix value type is forbidden.`
							});
						}
					}
				};
			}
		};
	}
};
