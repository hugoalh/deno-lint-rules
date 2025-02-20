import { isFileES } from "../_utility/file/es.ts";
export default {
	name: "hugoalh",
	rules: {
		"no-import-protocol-file": {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
						if (isFileES(context) && node.source.value.startsWith("file:")) {
							context.report({
								range: node.source.range,
								message: `Import module with protocol \`file\` is unnecessary.`
							});
						}
					}
				};
			}
		}
	}
} satisfies Deno.lint.Plugin;
