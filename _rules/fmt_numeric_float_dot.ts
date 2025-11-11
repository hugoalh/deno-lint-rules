import {
	dissectNodeNumberLiteral,
	isNodeNumberLiteral,
	type NodeNumberLiteralDissect,
	type RuleData
} from "../_utility.ts";
export interface RuleFmtNumericFloatDotOptions {
	/**
	 * Whether prefer float instead of integer; Not affect if the absolute value is less than 1.
	 * 
	 * | **Original** | **`false`** | **`true`** |
	 * |:-:|:-:|:-:|
	 * | `.5` | `0.5` | `0.5` |
	 * | `2.` | `2` | `2.0` |
	 * | `-.7` | `-0.7` | `-0.7` |
	 * | `-4.` | `-4` | `-4.0` |
	 * @default {false}
	 */
	preferFloat?: boolean;
}
const ruleMessage = `Require normalize the float of the numeric.`;
export const ruleData: RuleData = {
	identifier: "fmt-numeric-float-dot",
	tags: [
		"recommended"
	],
	querier(options: RuleFmtNumericFloatDotOptions = {}): Deno.lint.Rule {
		const { preferFloat = false }: RuleFmtNumericFloatDotOptions = options;
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Literal(node: Deno.lint.Literal): void {
						if (isNodeNumberLiteral(node)) {
							const {
								integer,
								float,
								floatIndexBegin
							}: NodeNumberLiteralDissect = dissectNodeNumberLiteral(node);
							if (float === ".") {
								const report: Deno.lint.ReportData = {
									node,
									message: ruleMessage
								};
								const rangeFixBegin: number = node.range[0] + floatIndexBegin!;
								const rangeFix: Deno.lint.Range = [rangeFixBegin, rangeFixBegin + 1];
								if (preferFloat) {
									report.hint = `Do you mean \`${node.raw.slice(0, floatIndexBegin! + 1)}0${node.raw.slice(floatIndexBegin! + 1)}\`?`;
									report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
										return fixer.insertTextAfterRange(rangeFix, "0");
									};
								} else {
									report.hint = `Do you mean \`${node.raw.replace(".", "")}\`?`;
									report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
										return fixer.removeRange(rangeFix);
									};
								}
								context.report(report);
							} else if (float !== null && integer === null) {
								context.report({
									node,
									message: ruleMessage,
									hint: `Do you mean \`0${node.raw}\`?`,
									fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
										return fixer.insertTextBefore(node, "0");
									}
								});
							}
						}
					}
				};
			}
		};
	}
};
