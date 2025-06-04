import {
	getContextCommentsFromRange,
	type RuleData
} from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			TSTypeAliasDeclaration(node: Deno.lint.TSTypeAliasDeclaration): void {
				if (node.typeAnnotation.type === "TSTypeLiteral") {
					const report: Deno.lint.ReportData = {
						node,
						message: `Prefer to use \`interface\` instead of \`type\`.`
					};
					const fixerRangeAssignSplitter: Deno.lint.Range = [Math.max(node.id.range[1], node.typeParameters?.range[1] ?? 0), node.typeAnnotation.range[0]];
					const fixerModeDeclare: boolean = node.declare && context.sourceCode.getText(node).startsWith("declare type");
					if ((
						!node.declare ||
						fixerModeDeclare
					) && getContextCommentsFromRange(context, ...fixerRangeAssignSplitter).length === 0) {
						const indexInRangeAssignSplitter: number = context.sourceCode.text.slice(...fixerRangeAssignSplitter).indexOf("=");
						if (indexInRangeAssignSplitter !== -1) {
							const indexInContext: number = fixerRangeAssignSplitter[0] + indexInRangeAssignSplitter;
							report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
								return [
									fixer.removeRange([indexInContext, indexInContext + 1]),
									fixer.replaceTextRange(fixerModeDeclare ? [node.range[0] + 8, node.range[0] + 8 + 4] : [node.range[0], node.range[0] + 4], "interface")
								];
							};
						}
					}
					context.report(report);
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
