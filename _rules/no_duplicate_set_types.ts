import {
	getCommentsFromRange,
	getContextPositionStringFromNode,
	serializeNode,
	type RuleData
} from "../_utility.ts";
interface RuleNoDuplicateSetTypesAssertorPayload {
	namePascal: string;
	operator: string;
}
function ruleAssertor(payload: RuleNoDuplicateSetTypesAssertorPayload, context: Deno.lint.RuleContext, node: Deno.lint.TSIntersectionType | Deno.lint.TSUnionType): void {
	if (node.types.length > 1) {
		const {
			namePascal,
			operator
		}: RuleNoDuplicateSetTypesAssertorPayload = payload;
		const typesSerialize: readonly string[] = node.types.map((type: Deno.lint.TypeNode): string => {
			return serializeNode(type);
		});
		const typesPosition: readonly string[] = node.types.map((type: Deno.lint.TypeNode): string => {
			return getContextPositionStringFromNode(context, type);
		});
		for (let index: number = 1; index < node.types.length; index += 1) {// Index 0 is always unique.
			const current: Deno.lint.TypeNode = node.types[index];
			const typesIndexDuplicated: number = typesSerialize.slice(0, index).indexOf(typesSerialize[index]);
			if (typesIndexDuplicated !== -1) {
				const report: Deno.lint.ReportData = {
					node: current,
					message: `${namePascal} of multiple same types have the same effect as single same type, possibly mergeable.`,
					hint: `The first position with same type: ${typesPosition[typesIndexDuplicated]}`
				};
				const previous: Deno.lint.TypeNode = node.types[index - 1];
				const fixerRangeTypesSplitter: Deno.lint.Range = [previous.range[1], current.range[0]];
				if (getCommentsFromRange(context, ...fixerRangeTypesSplitter).length === 0) {
					const indexOperatorInRangeTypesSplitter: number = context.sourceCode.text.slice(...fixerRangeTypesSplitter).indexOf(operator);
					if (indexOperatorInRangeTypesSplitter !== -1) {
						const indexOperatorInContext: number = fixerRangeTypesSplitter[0] + indexOperatorInRangeTypesSplitter;
						report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
							return [
								fixer.remove(current),
								fixer.removeRange([indexOperatorInContext, indexOperatorInContext + operator.length])
							];
						};
					}
				}
				context.report(report);
			}
		}
	}
}
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			TSIntersectionType(node: Deno.lint.TSIntersectionType): void {
				ruleAssertor({
					namePascal: "Intersection",
					operator: "&"
				}, context, node);
			},
			TSUnionType(node: Deno.lint.TSUnionType): void {
				ruleAssertor({
					namePascal: "Union",
					operator: "|"
				}, context, node);
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
