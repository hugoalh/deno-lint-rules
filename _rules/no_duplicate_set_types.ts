import type { DenoLintRuleDataPre } from "../_template.ts";
import { getNodeSlug } from "../_utility.ts";
interface DenoLintRuleNoDuplicateSetTypesAssertorOptions {
	namePascal: string;
	operator: string;
}
function ruleAssertor(context: Deno.lint.RuleContext, typeNode: Deno.lint.TSIntersectionType | Deno.lint.TSUnionType, options: DenoLintRuleNoDuplicateSetTypesAssertorOptions): void {
	const {
		namePascal,
		operator
	}: DenoLintRuleNoDuplicateSetTypesAssertorOptions = options;
	const slugs: readonly string[] = typeNode.types.map((type: Deno.lint.TypeNode): string => {
		return getNodeSlug(type);
	});
	const slugsUnique: string[] = [];
	const indexesUnique: number[] = [];
	for (let index: number = 0; index < slugs.length; index += 1) {
		const slug: string = slugs[index];
		if (!slugsUnique.includes(slug)) {
			slugsUnique.push(slug);
			indexesUnique.push(index);
		}
	}
	if (slugs.length !== slugsUnique.length) {
		const result: string = indexesUnique.map((index: number): string => {
			return context.sourceCode.getText(typeNode.types[index]);
		}).join(` ${operator} `);
		context.report({
			node: typeNode,
			message: `${namePascal} of multiple same types have the same effect as single same type.`,
			hint: `Do you mean \`${result}\`?`,
			fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
				return fixer.replaceText(typeNode, result);
			}
		});
	}
}
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			TSIntersectionType(node: Deno.lint.TSIntersectionType): void {
				ruleAssertor(context, node, {
					namePascal: "Intersection",
					operator: "&"
				});
			},
			TSUnionType(node: Deno.lint.TSUnionType): void {
				ruleAssertor(context, node, {
					namePascal: "Union",
					operator: "|"
				});
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-duplicate-set-types",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
