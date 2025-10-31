import {
	dissectNodeBigIntLiteral,
	dissectNodeNumberLiteral,
	isNodeBigIntLiteral,
	isNodeNumberLiteral,
	isNodeStringLiteral,
	type NodeBigIntLiteralDissect,
	type NodeNumberLiteralDissect,
	type RuleData
} from "../_utility.ts";
export interface RuleFmtHexCaseOptions {
	/**
	 * Whether to normalize to lower case.
	 * 
	 * | **On** | **`false`** | **`true`** |
	 * |:-:|:-:|:-:|
	 * | **BigInt** | `0x34ABn` | `0x34abn` |
	 * | **Number** | `0x34AB` | `0x34ab` |
	 * | **String** | `"\u34AB"` | `"\u34ab"` |
	 * @default {false}
	 */
	lowercase?: boolean;
}
function ruleAssertorNumeric(options: Required<RuleFmtHexCaseOptions>, ruleMessage: string, context: Deno.lint.RuleContext, node: Deno.lint.BigIntLiteral | Deno.lint.NumberLiteral, dissect: NodeBigIntLiteralDissect | NodeNumberLiteralDissect): void {
	const { lowercase }: Required<RuleFmtHexCaseOptions> = options;
	const {
		base,
		integer
	}: NodeBigIntLiteralDissect | NodeNumberLiteralDissect = dissect;
	if (
		base === "0X" ||
		base === "0x"
	) {
		const expect: string = lowercase ? integer.toLowerCase() : integer.toUpperCase();
		if (integer !== expect) {
			const rangeBegin: number = node.range[0] + base.length;
			const range: Deno.lint.Range = [rangeBegin, rangeBegin + integer.length];
			context.report({
				range,
				message: ruleMessage,
				hint: `Do you mean \`${expect}\`?`,
				fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
					return fixer.replaceTextRange(range, expect);
				}
			});
		}
	}
}
const regexpStringCodeEscapeU = /(?<!\\)\\u(?<hex>[\dA-Fa-f]{4})/g;
const regexpStringCodeEscapeUWrap = /(?<!\\)\\u\{(?<hex>[\dA-Fa-f]+?)\}/g;
const regexpStringCodeEscapeX = /(?<!\\)\\x(?<hex>[\dA-Fa-f]{2})/g;
function ruleAssertorString(options: Required<RuleFmtHexCaseOptions>, ruleMessage: string, context: Deno.lint.RuleContext, node: Deno.lint.StringLiteral | Deno.lint.TemplateElement): void {
	const { lowercase }: Required<RuleFmtHexCaseOptions> = options;
	for (const match of [
		...Array.from(node.raw.matchAll(regexpStringCodeEscapeU)),
		...Array.from(node.raw.matchAll(regexpStringCodeEscapeX))
	]) {
		const target: string | undefined = match.groups?.hex;
		if (typeof target === "undefined") {
			continue;
		}
		const expect: string = lowercase ? target.toLowerCase() : target.toUpperCase();
		if (target !== expect) {
			const rangeBegin: number = node.range[0] + match.index + 2;
			const range: Deno.lint.Range = [rangeBegin, rangeBegin + target.length];
			context.report({
				range,
				message: ruleMessage,
				hint: `Do you mean \`${expect}\`?`,
				fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
					return fixer.replaceTextRange(range, expect);
				}
			});
		}
	}
	for (const match of node.raw.matchAll(regexpStringCodeEscapeUWrap)) {
		const target: string | undefined = match.groups?.hex;
		if (typeof target === "undefined") {
			continue;
		}
		const expect: string = lowercase ? target.toLowerCase() : target.toUpperCase();
		if (target !== expect) {
			const rangeBegin: number = node.range[0] + match.index + 3;
			const range: Deno.lint.Range = [rangeBegin, rangeBegin + target.length];
			context.report({
				range,
				message: ruleMessage,
				hint: `Do you mean \`${expect}\`?`,
				fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
					return fixer.replaceTextRange(range, expect);
				}
			});
		}
	}
}
export const ruleData: RuleData = {
	identifier: "fmt-hex-case",
	tags: [
		"recommended"
	],
	querier(options: RuleFmtHexCaseOptions = {}): Deno.lint.Rule {
		const { lowercase = false }: RuleFmtHexCaseOptions = options;
		const ruleMessage: string = `Require normalize the case of the hex number to ${lowercase ? "lower" : "upper"} case.`;
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				const ruleAssertorNumericBind = ruleAssertorNumeric.bind(null, { lowercase }, ruleMessage, context);
				const ruleAssertorStringBind = ruleAssertorString.bind(null, { lowercase }, ruleMessage, context);
				return {
					Literal(node: Deno.lint.Literal): void {
						if (isNodeBigIntLiteral(node)) {
							ruleAssertorNumericBind(node, dissectNodeBigIntLiteral(node));
						} else if (isNodeNumberLiteral(node)) {
							ruleAssertorNumericBind(node, dissectNodeNumberLiteral(node));
						} else if (isNodeStringLiteral(node)) {
							ruleAssertorStringBind(node);
						}
					},
					TemplateElement: ruleAssertorStringBind
				};
			}
		};
	}
};
