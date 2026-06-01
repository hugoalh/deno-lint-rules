import type { RuleConstructContext } from "../_utility.ts";
export default {
	identifier: "no-namespace-implementation",
	tags: [
		"no-typescript-inject-feature"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					TSModuleDeclaration(node: Deno.lint.TSModuleDeclaration): void {
						if ((
							node.kind === "module" ||
							node.kind === "namespace"
						) && node.body?.body.some((statement: Deno.lint.Statement): boolean => {
							switch (statement.type) {
								case "ExportDefaultDeclaration":
								case "ExportNamedDeclaration":
									return (statement.exportKind === "value");
								case "TSDeclareFunction":
								case "TSInterfaceDeclaration":
								case "TSModuleDeclaration":
								case "TSTypeAliasDeclaration":
									return false;
								default:
									return true;
							}
						})) {
							context.report({
								node,
								message: `Implementation in the ${node.kind} declaration is forbidden.`
							});
						}
					}
				};
			}
		};
	}
} satisfies RuleConstructContext as RuleConstructContext;
