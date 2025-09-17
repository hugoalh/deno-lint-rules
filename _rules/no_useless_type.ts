import type { RuleData } from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "no-useless-type",
	tags: [
		"efficiency",
		"recommended",
		"simplify"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					TSTypeAliasDeclaration(node: Deno.lint.TSTypeAliasDeclaration): void {
						if (
							node.typeAnnotation.type === "TSAnyKeyword" ||
							node.typeAnnotation.type === "TSBigIntKeyword" ||
							node.typeAnnotation.type === "TSBooleanKeyword" ||
							node.typeAnnotation.type === "TSIntrinsicKeyword" ||
							(node.typeAnnotation.type === "TSLiteralType" && node.typeAnnotation.literal.type === "Literal") ||
							node.typeAnnotation.type === "TSNeverKeyword" ||
							node.typeAnnotation.type === "TSNullKeyword" ||
							node.typeAnnotation.type === "TSNumberKeyword" ||
							node.typeAnnotation.type === "TSObjectKeyword" ||
							node.typeAnnotation.type === "TSStringKeyword" ||
							node.typeAnnotation.type === "TSSymbolKeyword" ||
							(node.typeAnnotation.type === "TSTypeReference" && node.typeAnnotation.typeName.type === "Identifier" && typeof node.typeAnnotation.typeArguments === "undefined") ||
							node.typeAnnotation.type === "TSUndefinedKeyword" ||
							node.typeAnnotation.type === "TSUnknownKeyword" ||
							node.typeAnnotation.type === "TSVoidKeyword"
						) {
							context.report({
								node,
								message: `The type is too simple hence forbidden.`
							});
						}
					}
				};
			}
		};
	}
};
