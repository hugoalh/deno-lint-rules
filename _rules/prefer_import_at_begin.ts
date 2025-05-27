import {
	getContextPositionStringFromNode,
	type RuleData
} from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
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
								message: `Prefer statements \`import\` at the begin of the file.`,
								hint: lastPositionHint
							});
						} else {
							lastNode = statement;
						}
					} else {
						done = true;
						if (typeof lastNode !== "undefined") {
							lastPositionHint = `Last valid import declaration: ${getContextPositionStringFromNode(context, node)}`;
						}
					}
				}
			}
		};
	}
};
export const ruleData: RuleData = {
	identifier: "prefer-import-at-begin",
	sets: [
		"recommended"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
