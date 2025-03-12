import { dirname as getPathDirname } from "jsr:@std/path@^1.0.8/dirname";
import { relative as getPathRelative } from "jsr:@std/path@^1.0.8/relative";
export function getClosestAncestor(context: Deno.lint.RuleContext, node: Deno.lint.Node): Deno.lint.Node {
	const ancestors: Deno.lint.Node[] = context.sourceCode.getAncestors(node).slice(-1);
	return ancestors[ancestors.length - 1];
}
export function getMemberRootIdentifier(node: Deno.lint.CallExpression | Deno.lint.Expression | Deno.lint.Identifier | Deno.lint.MemberExpression | Deno.lint.NewExpression): Deno.lint.Identifier | null {
	switch (node.type) {
		case "AwaitExpression":
		case "UnaryExpression":
		case "UpdateExpression":
			return getMemberRootIdentifier(node.argument);
		case "CallExpression":
		case "NewExpression":
			return getMemberRootIdentifier(node.callee);
		case "ChainExpression":
		case "TSAsExpression":
		case "TSInstantiationExpression":
		case "TSNonNullExpression":
		case "TSSatisfiesExpression":
		case "TSTypeAssertion":
			return getMemberRootIdentifier(node.expression);
		case "ClassExpression":
		case "FunctionExpression":
			if (node.id !== null) {
				return getMemberRootIdentifier(node.id);
			}
			break;
		case "Identifier":
			return node;
		case "MemberExpression":
			return getMemberRootIdentifier(node.object);
		case "TaggedTemplateExpression":
			return getMemberRootIdentifier(node.tag);
		case "YieldExpression":
			if (node.argument !== null) {
				return getMemberRootIdentifier(node.argument);
			}
			break;
	}
	return null;
}
export interface ContextPosition {
	columnBegin: number;
	columnEnd: number;
	lineBegin: number;
	lineEnd: number;
}
export function getContextPositionRaw(raw: string, indexBegin: number, indexEnd: number): ContextPosition {
	const rawFmt: string = raw.replaceAll("\r\n", "\n");
	const rawBegin: string = rawFmt.slice(0, indexBegin);
	const rawBeginSplit: readonly string[] = rawBegin.split("\n");
	const lineBegin: number = rawBeginSplit.length;
	const columnBegin: number = rawBegin.replace(rawBeginSplit.slice(0, lineBegin - 1).join("\n"), "").length;
	const rawEnd: string = rawFmt.slice(0, indexEnd);
	const rawEndSplit: readonly string[] = rawEnd.split("\n");
	const lineEnd: number = rawEndSplit.length;
	const columnEnd: number = rawEnd.replace(rawEndSplit.slice(0, lineEnd - 1).join("\n"), "").length;
	return {
		columnBegin,
		columnEnd,
		lineBegin,
		lineEnd
	};
}
export function getContextPosition(context: Deno.lint.RuleContext, node: Deno.lint.Node): ContextPosition {
	const [rawIndexBegin, rawIndexEnd]: Deno.lint.Range = node.range;
	return getContextPositionRaw(context.sourceCode.text, rawIndexBegin, rawIndexEnd);
}
export function isBigIntLiteral(node: Deno.lint.Node): node is Deno.lint.BigIntLiteral {
	return (node.type === "Literal" && typeof node.value === "bigint");
}
export function isBooleanLiteral(node: Deno.lint.Node): node is Deno.lint.BooleanLiteral {
	return (node.type === "Literal" && typeof node.value === "boolean");
}
export function isNullLiteral(node: Deno.lint.Node): node is Deno.lint.NullLiteral {
	return (node.type === "Literal" && node.value === null);
}
export function isNumberLiteral(node: Deno.lint.Node): node is Deno.lint.NumberLiteral {
	return (node.type === "Literal" && typeof node.value === "number");
}
export function isRegExpLiteral(node: Deno.lint.Node): node is Deno.lint.RegExpLiteral {
	return (node.type === "Literal" && node.value instanceof RegExp);
}
export function isStringLiteral(node: Deno.lint.Node): node is Deno.lint.StringLiteral {
	return (node.type === "Literal" && typeof node.value === "string");
}
export function resolveModuleRelativePath(from: string, to: string): string {
	const result: string = getPathRelative(getPathDirname(from), to).replaceAll("\\", "/");
	return ((
		result.startsWith("./") ||
		result.startsWith("../")
	) ? result : `./${result}`);
}
