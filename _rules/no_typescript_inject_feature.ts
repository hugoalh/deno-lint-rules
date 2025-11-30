import type { RuleData } from "../_utility.ts";
const ruleMessage: string = `Use of TypeScript inject feature is forbidden.`;
export const ruleData: RuleData = {
	identifier: "no-typescript-inject-feature",
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					AccessorProperty(node: Deno.lint.AccessorProperty): void {
						if (typeof node.accessibility !== "undefined") {
							context.report({
								node: node as unknown as Deno.lint.Node,
								message: ruleMessage
							});
						}
					},
					MethodDefinition(node: Deno.lint.MethodDefinition): void {
						if (typeof node.accessibility !== "undefined") {
							context.report({
								node,
								message: ruleMessage
							});
						}
					},
					PropertyDefinition(node: Deno.lint.PropertyDefinition): void {
						if (typeof node.accessibility !== "undefined") {
							context.report({
								node,
								message: ruleMessage
							});
						}
					},
					TSEnumDeclaration(node: Deno.lint.TSEnumDeclaration): void {
						context.report({
							node,
							message: ruleMessage
						});
					},
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
								message: ruleMessage
							});
						}
					},
					TSParameterProperty(node: Deno.lint.TSParameterProperty): void {
						if (typeof node.accessibility !== "undefined") {
							context.report({
								node: node as unknown as Deno.lint.Node,
								message: ruleMessage
							});
						}
					}
				};
			}
		};
	}
};
