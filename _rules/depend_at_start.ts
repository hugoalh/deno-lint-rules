import {
	getVisualPositionStringFromNode,
	type NodeDepend,
	type RuleConstructContext
} from "../_utility.ts";
export interface RuleDependAtStartOptions {
	/**
	 * Whether to ignore `export` statements, and only require `import` statements locate at the start of the script.
	 * @default {false}
	 */
	ignoreExport?: boolean;
}
export default {
	identifier: "depend-at-start",
	tags: [
		"recommended",
		"security"
	],
	querier(payload: unknown = {}): Deno.lint.Rule {
		const { ignoreExport = false }: RuleDependAtStartOptions = payload as RuleDependAtStartOptions;
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Program(node: Deno.lint.Program): void {
						let done: boolean = false;
						let lastNode: NodeDepend | undefined;
						let lastPositionHint: string | undefined;
						for (const statement of node.body) {
							if (
								(!ignoreExport && statement.type === "ExportAllDeclaration") ||
								(!ignoreExport && statement.type === "ExportNamedDeclaration" && statement.source !== null) ||
								statement.type === "ImportDeclaration"
							) {
								if (done) {
									context.report({
										node: statement,
										message: `Require ${ignoreExport ? "" : `\`export\`/`}\`import\` statement locate at the start of the script.`,
										hint: lastPositionHint
									});
								} else {
									lastNode = statement;
								}
							} else {
								done = true;
								if (typeof lastNode !== "undefined") {
									lastPositionHint = `Last valid ${ignoreExport ? "" : `\`export\`/`}\`import\` statement: ${getVisualPositionStringFromNode(context, lastNode)}`;
								}
							}
						}
					}
				};
			}
		};
	}
} satisfies RuleConstructContext as RuleConstructContext;
