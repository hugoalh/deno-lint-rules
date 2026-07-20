import {
	getNodeCommentsFromRange,
	NodeSerializer,
	NodeVisualPosition,
	type RuleConstructContext
} from "../_utility.ts";
const serializer: NodeSerializer = new NodeSerializer();
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
			return serializer.for(type);
		});
		const typesPosition: readonly string[] = node.types.map((type: Deno.lint.TypeNode): string => {
			return new NodeVisualPosition(context, type).toString();
		});
		for (let index: number = 1; index < node.types.length; index += 1) {// Index 0 is always unique.
			const current: Deno.lint.TypeNode = node.types[index];
			const typesIndexDuplicated: number = typesSerialize.slice(0, index).indexOf(typesSerialize[index]);
			if (typesIndexDuplicated !== -1) {
				const report: Deno.lint.ReportData = {
					node: current,
					message: `${namePascal} of multiple same types have the same effect as single same type, possibly mergeable.`,
					hint: `The first same type locate at index #${typesIndexDuplicated} with position ${typesPosition[typesIndexDuplicated]}.`
				};
				const fixerRange: Deno.lint.Range = [node.types[index - 1].range[1], current.range[1]];
				if (getNodeCommentsFromRange(context, fixerRange).length === 0) {
					report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
						return fixer.removeRange(fixerRange);
					};
				}
				context.report(report);
			}
		}
	}
}
export default {
	identifier: "no-duplicate-set-types",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
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
	}
} satisfies RuleConstructContext as RuleConstructContext;
