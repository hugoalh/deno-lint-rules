import {
	dissectNumericLiteral,
	isNodeBigIntLiteral,
	isNodeNumberLiteral,
	isNodeStringLiteral,
	type NodeNumericLiteralDissectMeta,
	type RuleData
} from "../_utility.ts";
export interface RulePreferHexCaseOptions {
	/**
	 * Whether prefer lower case for the hex.
	 * 
	 * - **`false`:** `0x34ABn`, `0x34AB`, `"\u34AB"`
	 * - **`true`:** `0x34abn`, `0x34ab`, `"\u34ab"`
	 * @default {false}
	 */
	lowercase?: boolean;
}
const regexpStringCodeEscapeU = /(?<!\\)\\u(?<hex>[\dA-Fa-f]{4})/g;
const regexpStringCodeEscapeUWrap = /(?<!\\)\\u\{(?<hex>[\dA-Fa-f]+?)\}/g;
const regexpStringCodeEscapeX = /(?<!\\)\\x(?<hex>[\dA-Fa-f]{2})/g;
function ruleAssertorString(options: Required<RulePreferHexCaseOptions>, ruleMessage: string, context: Deno.lint.RuleContext, node: Deno.lint.StringLiteral | Deno.lint.TemplateElement): void {
	const { lowercase }: Required<RulePreferHexCaseOptions> = options;
	for (const match of [
		...Array.from(node.raw.matchAll(regexpStringCodeEscapeU)),
		...Array.from(node.raw.matchAll(regexpStringCodeEscapeX))
	]) {
		const hex: string | undefined = match.groups?.hex;
		if (typeof hex === "undefined") {
			continue;
		}
		const hexExpect: string = lowercase ? hex.toLowerCase() : hex.toUpperCase();
		if (hex !== hexExpect) {
			const range: Deno.lint.Range = [node.range[0] + match.index + 2, node.range[0] + match.index + 2 + hex.length];
			context.report({
				range,
				message: ruleMessage,
				hint: `Fix this to \`${hexExpect}\`?`,
				fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
					return fixer.replaceTextRange(range, hexExpect);
				}
			});
		}
	}
	for (const match of node.raw.matchAll(regexpStringCodeEscapeUWrap)) {
		const hex: string | undefined = match.groups?.hex;
		if (typeof hex === "undefined") {
			continue;
		}
		const hexExpect: string = lowercase ? hex.toLowerCase() : hex.toUpperCase();
		if (hex !== hexExpect) {
			const range: Deno.lint.Range = [node.range[0] + match.index + 3, node.range[0] + match.index + 3 + hex.length];
			context.report({
				range,
				message: ruleMessage,
				hint: `Fix this to \`${hexExpect}\`?`,
				fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
					return fixer.replaceTextRange(range, hexExpect);
				}
			});
		}
	}
}
export const ruleData: RuleData = {
	identifier: "prefer-hex-case",
	sets: [
		"recommended"
	],
	context(options: RulePreferHexCaseOptions = {}): Deno.lint.Rule {
		const { lowercase = false }: RulePreferHexCaseOptions = options;
		const ruleMessage = `Prefer the hex is ${lowercase ? "lower" : "upper"} case.`;
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				const ruleAssertorStringBind = ruleAssertorString.bind(null, { lowercase }, ruleMessage, context);
				return {
					Literal(node: Deno.lint.Literal): void {
						if (
							isNodeBigIntLiteral(node) ||
							isNodeNumberLiteral(node)
						) {
							const {
								baseFmt,
								integer
							}: NodeNumericLiteralDissectMeta = dissectNumericLiteral(node);
							if (baseFmt === "0x") {
								const integerExpect: string = lowercase ? integer.toLowerCase() : integer.toUpperCase();
								if (integer !== integerExpect) {
									const range: Deno.lint.Range = [node.range[0] + baseFmt.length, node.range[0] + baseFmt.length + integer.length];
									context.report({
										range,
										message: ruleMessage,
										hint: `Fix this to \`${integerExpect}\`?`,
										fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
											return fixer.replaceTextRange(range, integerExpect);
										}
									});
								}
							}
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
