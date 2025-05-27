import {
	serializeNode,
	type RuleData
} from "../_utility.ts";
interface RuleNoDuplicateSetTypesAssertorOptions {
	namePascal: string;
	operator: string;
}
function ruleAssertor(context: Deno.lint.RuleContext, typeNode: Deno.lint.TSIntersectionType | Deno.lint.TSUnionType, options: RuleNoDuplicateSetTypesAssertorOptions): void {
	const {
		namePascal,
		operator
	}: RuleNoDuplicateSetTypesAssertorOptions = options;
	const typesNormalize: readonly string[] = typeNode.types.map((type: Deno.lint.TypeNode): string => {
		return serializeNode(type);
	});
	const typesUnique: string[] = [];
	const indexesUnique: number[] = [];
	for (let index: number = 0; index < typesNormalize.length; index += 1) {
		const typeNormalize: string = typesNormalize[index];
		if (!typesUnique.includes(typeNormalize)) {
			typesUnique.push(typeNormalize);
			indexesUnique.push(index);
		}
	}
	if (typesNormalize.length !== typesUnique.length) {
		const result: string = indexesUnique.map((index: number): string => {
			return context.sourceCode.getText(typeNode.types[index]);
		}).join(` ${operator} `);
		const report: Deno.lint.ReportData = {
			node: typeNode,
			message: `${namePascal} of multiple same types have the same effect as single same type, possibly not intended and is mergeable.`,
			hint: `Do you mean \`${result}\`?`
		};
		if (context.sourceCode.getCommentsInside(typeNode).length === 0) {
			report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
				return fixer.replaceText(typeNode, result);
			};
		}
		context.report(report);
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
export const ruleData: RuleData = {
	identifier: "no-duplicate-set-types",
	sets: [
		"recommended"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
