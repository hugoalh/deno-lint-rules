import {
	getVisualPositionStringFromNode,
	type RuleData
} from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "import-at-start",
	tags: [
		"recommended",
		"security"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Program(node: Deno.lint.Program): void {
						let done: boolean = false;
						let lastNode: Deno.lint.ImportDeclaration | undefined;
						let lastPositionHint: string | undefined;
						for (const statement of node.body) {
							if (statement.type === "ImportDeclaration") {
								if (done) {
									context.report({
										node: statement,
										message: `Require \`import\` statement locate at the start of the script.`,
										hint: lastPositionHint
									});
								} else {
									lastNode = statement;
								}
							} else {
								done = true;
								if (typeof lastNode !== "undefined") {
									lastPositionHint = `Last valid \`import\` statement: ${getVisualPositionStringFromNode(context, lastNode)}`;
								}
							}
						}
					}
				};
			}
		};
	}
};
