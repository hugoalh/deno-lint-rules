import type { RuleData } from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			TSTypeAliasDeclaration(node: Deno.lint.TSTypeAliasDeclaration): void {
				if (node.typeAnnotation.type === "TSTypeLiteral") {
					context.report({
						node,
						message: `Prefer to use \`interface\` instead of \`type\`.`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
							return fixer.replaceText(node, `interface ${context.sourceCode.getText(node.id)}${(typeof node.typeParameters === "undefined") ? "" : context.sourceCode.getText(node.typeParameters)} ${context.sourceCode.getText(node.typeAnnotation)}`);
						}
					});
				}
			}
		};
	}
};
export const ruleData: RuleData = {
	identifier: "prefer-interface",
	sets: [
		"recommended"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
