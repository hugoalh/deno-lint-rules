import { isFileES } from "../_utility/file/es.ts";
export default {
	name: "hugoalh",
	rules: {
		"no-import-protocol-data": {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
						if (isFileES(context) && node.source.value.startsWith("data:")) {
							context.report({
								range: node.source.range,
								message: `Import module with protocol \`data\` is hard to maintain and not secure.`
							});
						}
					}
				};
			}
		}
	}
} satisfies Deno.lint.Plugin;
