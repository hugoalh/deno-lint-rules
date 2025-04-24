import type { DenoLintRuleData } from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
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
						message: `The type alias is too simple hence forbidden.`
					});
				}
			}
		};
	}
};
export const ruleData: DenoLintRuleData = {
	identifier: "no-useless-type",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
