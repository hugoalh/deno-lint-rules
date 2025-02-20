import { isFileES } from "../_utility/file/es.ts";
export default {
	name: "hugoalh",
	rules: {
		"no-import-protocol-node": {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
						if (isFileES(context) && node.source.value.startsWith("node:")) {
							context.report({
								range: node.source.range,
								message: `Import module with protocol \`node\` is forbidden.`
							});
						}
					}
				};
			}
		}
	}
} satisfies Deno.lint.Plugin;
