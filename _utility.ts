//deno-lint-ignore-file hugoalh/no-export-depend -- External utility.
import {
	parse as parseJSONC,
	type JsonValue
} from "jsr:@std/jsonc@^1.0.2/parse";
import {
	closestString,
	type ClosestStringOptions
} from "jsr:@std/text@^1.0.19/closest-string";
import { levenshteinDistance } from "jsr:@std/text@^1.0.19/levenshtein-distance";
import {
	watch as watchFS,
	type WatchEventType
} from "node:fs";
import {
	dirname as getPathDirname,
	join as joinPath,
	relative as getPathRelative
} from "node:path";
export { partition } from "jsr:@std/collections@^1.2.0/partition";
export type NodeAll =
	| Deno.lint.Node
	| Deno.lint.AccessorProperty
	| Deno.lint.Parameter;
export type NodeComment =
	| Deno.lint.BlockComment
	| Deno.lint.LineComment;
export type NodeDepend =
	| Deno.lint.ExportAllDeclaration
	| Deno.lint.ExportNamedDeclaration
	| Deno.lint.ImportDeclaration;
//#region Core
export type RuleQuerier = (payload?: unknown) => Deno.lint.Rule;
export type RuleTag =
	| "curly"
	| "deno-coverage-ignore-reason"
	| "deno-fmt-ignore-reason"
	| "deno-lint-ignore-reason"
	| "deno-ignore-reason"
	| "efficiency"
	| "fmt"
	| "ignore-reason"
	| "jsdoc"
	| "mistake"
	| "no-depend-type-raw"
	| "no-empty-comment"
	| "no-float-dot"
	| "no-interaction"
	| "no-typescript-inject-feature"
	| "recommended"
	| "security"
	| "simplify";
export interface RuleConstructContext {
	identifier: string;
	querier: RuleQuerier;
	tags?: readonly RuleTag[];
}
export function constructPlugin(rules: Deno.lint.Plugin["rules"]): Deno.lint.Plugin {
	return {
		name: "hugoalh",
		rules
	};
}
//#endregion
//#region General
export const listFormatterConjunction = new Intl.ListFormat("en", {
	localeMatcher: "best fit",
	style: "long",
	type: "conjunction"
});
export interface ContextSlice {
	range: Deno.lint.Range;
	value: string;
}
export function areNodesSame(a: Deno.lint.Node, b: Deno.lint.Node): boolean {
	return (a.type === b.type && a.range[0] === b.range[0] && a.range[1] === b.range[1]);
}
export function getNodeChainRootIdentifier(node: Deno.lint.ChainExpression): Deno.lint.Identifier | null {
	let target: NodeAll = node as NodeAll;
	while (true) {
		switch (target.type) {
			case "CallExpression":
				target = target.callee;
				break;
			case "ChainExpression":
				target = target.expression;
				break;
			case "Identifier":
				return target;
			case "MemberExpression":
				target = target.object;
				break;
			case "TSIndexedAccessType":
				target = target.objectType;
				break;
			case "TSTypeReference":
				target = target.typeName;
				break;
			case "TSQualifiedName":
				target = target.left;
				break;
			default:
				return null;
		}
	}
}
export function* getTextCodePoints(input: string): Generator<number> {
	let index: number = 0;
	while (index < input.length) {
		const codePoint: number = input.codePointAt(index)!;
		yield codePoint;
		index += String.fromCodePoint(codePoint).length;
	}
}
export function isNodeBlockStatementHasDeclaration(node: Deno.lint.BlockStatement | Deno.lint.Program): boolean {
	return node.body.some((statement: Deno.lint.Statement): boolean => {
		return (
			statement.type === "ClassDeclaration" ||
			statement.type === "FunctionDeclaration" ||
			statement.type === "TSEnumDeclaration" ||
			statement.type === "TSInterfaceDeclaration" ||
			statement.type === "TSModuleDeclaration" ||
			statement.type === "TSTypeAliasDeclaration" ||
			statement.type === "VariableDeclaration"
		);
	});
}
export function isNodeEndWithSemiColon(context: Deno.lint.RuleContext, node: NodeAll): boolean {
	return context.sourceCode.getText(node as Deno.lint.Node).endsWith(";");
}
export function isNodeHasOperation(node: NodeAll): boolean {
	switch (node.type) {
		case "ArrayExpression":
			return node.elements.some((element: Deno.lint.Expression | Deno.lint.SpreadElement): boolean => {
				return isNodeHasOperation(element);
			});
		case "ArrowFunctionExpression":
		case "Identifier":
		case "Literal":
			return false;
		case "BinaryExpression":
			return !(
				(
					(
						node.operator === "-" ||
						node.operator === "!=" ||
						node.operator === "!==" ||
						node.operator === "*" ||
						node.operator === "**" ||
						node.operator === "/" ||
						node.operator === "&" ||
						node.operator === "%" ||
						node.operator === "^" ||
						node.operator === "+" ||
						node.operator === "<" ||
						node.operator === "<<" ||
						node.operator === "<=" ||
						node.operator === "==" ||
						node.operator === "===" ||
						node.operator === ">" ||
						node.operator === ">=" ||
						node.operator === ">>" ||
						node.operator === ">>>" ||
						node.operator === "|"
					) && (
						node.left.type === "Identifier" ||
						node.left.type === "Literal" ||
						(node.left.type === "UnaryExpression" && !isNodeHasOperation(node.left))
					) && (
						node.right.type === "Identifier" ||
						node.right.type === "Literal"
					)
				) ||
				((
					node.operator === "in" ||
					node.operator === "instanceof"
				) && !isNodeHasOperation(node.left) && !isNodeHasOperation(node.right))
			);
		case "ConditionalExpression":
			return (
				isNodeHasOperation(node.test) ||
				isNodeHasOperation(node.consequent) ||
				isNodeHasOperation(node.alternate)
			);
		case "ExpressionStatement":
			return isNodeHasOperation(node.expression);
		case "SpreadElement":
			return isNodeHasOperation(node.argument);
		case "TemplateLiteral":
			return node.expressions.some((expression: Deno.lint.Expression): boolean => {
				return isNodeHasOperation(expression);
			});
		case "UnaryExpression":
			return !(
				(
					(
						node.operator === "!" ||
						node.operator === "+" ||
						node.operator === "-"
					) && (
						node.argument.type === "Identifier" ||
						node.argument.type === "Literal"
					)
				) ||
				(node.operator === "typeof" && !isNodeHasOperation(node.argument))
			);
		default:
			return true;
	}
}
export class Grouper<TValue, TKey extends string = string> {
	#entries: Record<TKey, TValue[]> = {} as Record<TKey, TValue[]>;
	#lockKeys: boolean;
	constructor(keys: readonly TKey[] = []) {
		if (keys.length === 0) {
			this.#lockKeys = false;
		} else {
			for (const key of keys) {
				this.#entries[key] = [];
			}
			this.#lockKeys = true;
		}
	}
	add(value: TValue, key: TKey, ...keysFallback: readonly TKey[]): this {
		if (this.#lockKeys) {
			for (const _key of [key, ...keysFallback]) {
				try {
					this.#entries[_key].push(value);
					break;
				} catch {
					// CONTINUE
				}
			}
		} else {
			this.#entries[key] ??= [];
			this.#entries[key].push(value);
		}
		return this;
	}
	entries(): [TKey, TValue[]][] {
		return Object.entries(this.#entries) as [TKey, TValue[]][];
	}
	values(): TValue[][] {
		return Object.values(this.#entries);
	}
}
export class NodeChildrenIterator {
	#depth: number;
	constructor(depth: number = Infinity) {
		if (!(
			depth === Infinity ||
			(Number.isSafeInteger(depth) && depth >= 0)
		)) {
			throw new RangeError(`Parameter \`depth\` is not \`Infinity\`, or a number which is integer, positive, and safe!`);
		}
		this.#depth = depth;
	}
	*#iterate(node: NodeAll, depthCurrent: number = 0): Generator<NodeAll> {
		if (depthCurrent <= this.#depth) {
			for (const [
				key,
				descriptor
			] of Object.entries(Object.getOwnPropertyDescriptors(node))) {
				if (
					key === "parent" ||
					key === "range" ||
					key === "type"
				) {
					continue;
				}
				const value = descriptor.value;
				if (Array.isArray(value)) {
					for (const element of value) {
						yield* this.#iterate(element, depthCurrent + 1);
					}
					continue;
				}
				if (
					typeof value === "undefined" ||
					typeof value.type === "undefined"
				) {
					continue;
				}
				yield node;
				yield* this.#iterate(value, depthCurrent + 1);
			}
		}
	}
	iterate(node: NodeAll): Generator<NodeAll> {
		return this.#iterate(node);
	}
}
const globalNames: readonly string[] = [/* UNIQUE */
	"globalThis",
	"self",
	"window"
];
export class NodeMemberExpressionMatcher {
	#fromGlobals: boolean | null;
	#pattern: readonly string[];
	constructor(pattern: readonly string[], fromGlobals: boolean | null = false) {
		this.#fromGlobals = fromGlobals;
		if (pattern.length === 0) {
			throw new Error(`Parameter \`pattern\` is empty!`);
		}
		this.#pattern = pattern;
	}
	test(node: Deno.lint.MemberExpression): boolean {
		const members: string[] = [];
		let target: Deno.lint.Node = node;
		while (true) {
			if (target.type === "Identifier") {
				members.unshift(target.name);
				break;
			}
			if (target.type === "MemberExpression") {
				if (target.property.type === "Identifier") {
					members.unshift(target.property.name);
					target = target.object;
					continue;
				}
				if (isNodeStringLiteral(target.property)) {
					members.unshift(target.property.value);
					target = target.object;
					continue;
				}
			}
			return false;
		}
		const indexOfPatternBegin: number = members.indexOf(this.#pattern[0]);
		if (
			indexOfPatternBegin < 0 ||
			(this.#fromGlobals === false && indexOfPatternBegin !== 0) ||
			(this.#fromGlobals === true && indexOfPatternBegin === 0)
		) {
			return false;
		}
		const membersPartPre: readonly string[] = members.slice(0, indexOfPatternBegin);
		const membersPartSuf: readonly string[] = members.slice(indexOfPatternBegin);
		return (membersPartPre.every((member: string): boolean => {
			return globalNames.includes(member);
		}) && membersPartSuf.length === this.#pattern.length && membersPartSuf.every((memberPartSuf: string, index: number): boolean => {
			return (memberPartSuf === this.#pattern[index]);
		}));
	}
}
export interface ResolveClosestStringOptions extends ClosestStringOptions {
	maximumLevenshteinDistance?: number;
}
export function resolveClosestString<T extends string = string>(input: string, possibles: readonly T[], options: ResolveClosestStringOptions = {}): T | null {
	const { maximumLevenshteinDistance = 3 }: ResolveClosestStringOptions = options;
	const possiblesFiltered: T[] = possibles.filter((element: T): boolean => {
		return (levenshteinDistance(input, element) <= maximumLevenshteinDistance);
	});
	switch (possiblesFiltered.length) {
		case 0:
			return null;
		case 1:
			return possiblesFiltered[0];
		default:
			return closestString(input, possiblesFiltered, options) as T;
	}
}
//#endregion
//#region Privilege
export interface PluginPrivilegeOperationOptions {
	/**
	 * Whether to allow plugin read the imports map.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * >
	 * > - File System - Read (`read`)
	 * @default {false}
	 */
	readImportsMap?: boolean;
}
export interface ImportsMapContext {
	key: string;
	value: string;
}
const importsMapFilesName = [
	"deno.jsonc",
	"deno.json",
	"jsr.jsonc",
	"jsr.json"
] as const satisfies readonly string[];
const importsMapDB: Record<typeof importsMapFilesName[number], ImportsMapContext[]> = Object.fromEntries(importsMapFilesName.map((importsMapFileName): [typeof importsMapFilesName[number], ImportsMapContext[]] => {
	return [importsMapFileName, []];
})) as Record<typeof importsMapFilesName[number], ImportsMapContext[]>;
let importsMapWatcherInitialized: boolean = false;
function updateImportsMapDB(cwd: string, filename: typeof importsMapFilesName[number]): void {
	switch (filename) {
		case "deno.jsonc":
		case "deno.json":
		case "jsr.jsonc":
		case "jsr.json":
			try {
				const imports = (parseJSONC(Deno.readTextFileSync(joinPath(cwd, filename))) as Record<string, JsonValue | undefined>)?.imports;
				if (typeof imports !== "undefined") {
					importsMapDB[filename] = Object.entries(imports as Record<string, string>).map(([key, value]: [string, string]): ImportsMapContext => {
						return {
							key,
							value
						};
					});
				}
			} catch {
				importsMapDB[filename] = [];
			}
	}
}
export function getImportsMap(): Readonly<Record<typeof importsMapFilesName[number], readonly ImportsMapContext[]>> {
	if (!importsMapWatcherInitialized) {
		try {
			const cwd: string = Deno.cwd();
			for (const filename of Object.keys(importsMapDB)) {
				updateImportsMapDB(cwd, filename as typeof importsMapFilesName[number]);
			}
			watchFS(cwd, {
				encoding: "utf8",
				persistent: false,
				recursive: false
			}, (_eventType: WatchEventType, filename: string | null) => {
				if (importsMapFilesName.includes(filename as typeof importsMapFilesName[number])) {
					updateImportsMapDB(cwd, filename as typeof importsMapFilesName[number]);
				}
			});
		} catch {
			// CONTINUE
		}
		importsMapWatcherInitialized = true;
	}
	return structuredClone(importsMapDB);
}
//#endregion
//#region Comment
export interface NodeBlockCommentLine extends ContextSlice {
}
export function dissectNodeBlockCommentLine(node: Deno.lint.BlockComment): NodeBlockCommentLine[] {
	const offset: number = node.range[0] + 2;
	const result: NodeBlockCommentLine[] = [];
	for (let index: number = 0; index < node.value.length; index += 1) {
		const rangeBegin: number = offset + index;
		const indexLF: number = node.value.indexOf("\n", index);
		const slice: string = node.value.slice(index, (indexLF < 0) ? undefined : indexLF);
		const value: string = slice.endsWith("\r") ? slice.slice(0, -1) : slice;
		result.push({
			range: [rangeBegin, rangeBegin + value.length],
			value
		});
		index += slice.length;
	}
	return result;
}
export function getNodeCommentsFromRange(context: Deno.lint.RuleContext, range: Deno.lint.Range): NodeComment[] {
	const [
		rangeBegin,
		rangeEnd
	]: Deno.lint.Range = range;
	return context.sourceCode.getAllComments().filter(({
		range: [
			commentBegin,
			commentEnd
		]
	}: NodeComment): boolean => {
		if (
			commentEnd <= rangeBegin ||
			rangeEnd <= commentBegin
		) {
			return false;
		}
		if (!(rangeBegin <= commentBegin && commentEnd <= rangeEnd)) {
			console.warn(`Defined range is splitted comment! Range: ${rangeBegin}~${rangeEnd}; Comment: ${commentBegin}~${commentEnd}.`);
		}
		return true;
	});
}
export function getNodeCommentsTop(context: Deno.lint.RuleContext): NodeComment[] {
	return context.sourceCode.getCommentsBefore(context.sourceCode.ast);
}
export function getNodeCommentsTypeScriptImportAnnotate(context: Deno.lint.RuleContext): Deno.lint.LineComment[] {
	return context.sourceCode.getAllComments().filter((comment: NodeComment): comment is Deno.lint.LineComment => {
		return (comment.type === "Line");
	}).filter((comment: Deno.lint.LineComment): boolean => {
		const valueTrim: string = comment.value.trim();
		return (valueTrim.startsWith("@ts-types=\"") && valueTrim.endsWith("\""));
	});
}
//#endregion
//#region Ignore Directive
const regexpSplitWhitespaces = /\s+/g;
export interface NodeIgnoreDirectiveDissect {
	indexDDash: number | null;
	params: ContextSlice[];
	target: ContextSlice;
}
export function dissectNodeIgnoreDirective(node: Deno.lint.LineComment, target: string): NodeIgnoreDirectiveDissect | undefined {
	const offset: number = node.range[0] + 2;
	const slicesRaw: string[] = node.value.trim().split(regexpSplitWhitespaces);
	if (slicesRaw[0] !== target) {
		return;
	}
	const slicesContext: ContextSlice[] = [];
	let cursor: number = 0;
	for (const sliceRaw of slicesRaw) {
		const indexBegin: number = node.value.indexOf(sliceRaw, cursor);
		const rangeBegin: number = offset + indexBegin;
		slicesContext.push({
			range: [rangeBegin, rangeBegin + sliceRaw.length],
			value: sliceRaw
		});
		cursor = indexBegin + sliceRaw.length;
	}
	const indexDDash: number = slicesRaw.findIndex((part: string): boolean => {
		return (part === "--");
	});
	return {
		indexDDash: (indexDDash >= 0) ? indexDDash : null,
		params: slicesContext.slice(1),
		target: slicesContext[0]
	};
}
//#endregion
//#region JSDoc
export const jsdocTags = [/* UNIQUE */
	"@abstract",
	"@access",
	"@alias",
	"@alpha",
	"@arg",
	"@argument",
	"@async",
	"@augments",
	"@author",
	"@beta",
	"@borrows",
	"@callback",
	"@category",
	"@class",
	"@classdesc",
	"@const",
	"@constant",
	"@constructor",
	"@constructs",
	"@copyright",
	"@decorator",
	"@default",
	"@defaultvalue",
	"@defaultValue",
	"@deprecated",
	"@desc",
	"@description",
	"@document",
	"@emits",
	"@enum",
	"@event",
	"@eventproperty",
	"@eventProperty",
	"@example",
	"@exception",
	"@expand",
	"@experimental",
	"@exports",
	"@extends",
	"@external",
	"@file",
	"@fileoverview",
	"@fileOverview",
	"@fires",
	"@func",
	"@function",
	"@generator",
	"@global",
	"@group",
	"@hidden",
	"@hideconstructor",
	"@hideConstructor",
	"@host",
	"@ignore",
	"@implements",
	"@import",
	"@include",
	"@inheritdoc",
	"@inheritDoc",
	"@inline",
	"@inner",
	"@instance",
	"@interface",
	"@internal",
	"@jsx",
	"@kind",
	"@label",
	"@lends",
	"@license",
	"@link",
	"@listens",
	"@member",
	"@memberof",
	"@memberof!",
	"@mergemodulewith",
	"@mergeModuleWith",
	"@method",
	"@mixes",
	"@mixin",
	"@module",
	"@name",
	"@namespace",
	"@overload",
	"@override",
	"@overview",
	"@package",
	"@packagedocumentation",
	"@packageDocumentation",
	"@param",
	"@primaryexport",
	"@primaryExport",
	"@private",
	"@privateremarks",
	"@privateRemarks",
	"@prop",
	"@property",
	"@protected",
	"@public",
	"@readonly",
	"@remarks",
	"@requires",
	"@return",
	"@returns",
	"@satisfies",
	"@sealed",
	"@see",
	"@since",
	"@sortstrategy",
	"@sortStrategy",
	"@static",
	"@summary",
	"@tags",
	"@template",
	"@this",
	"@throws",
	"@todo",
	"@tutorial",
	"@type",
	"@typedef",
	"@typeparam",
	"@typeParam",
	"@usedeclaredtype",
	"@useDeclaredType",
	"@var",
	"@variation",
	"@version",
	"@virtual",
	"@yield",
	"@yields"
] as const satisfies readonly string[];
export const jsdocTagsSynonyms: readonly (readonly typeof jsdocTags[number][])[] = [
	["@abstract", "@virtual"],
	["@constant", "@const"],
	["@default", "@defaultvalue", "@defaultValue"],
	["@description", "@desc"],
	["@extends", "@augments"],
	["@function", "@func"],
	["@param", "@arg", "@argument"],
	["@property", "@prop"],
	["@returns", "@return"],
	["@template", "@typeparam", "@typeParam"],
	["@throws", "@exception"],
	["@yields", "@yield"]
];
const regexpJSDocDirective = /^\*(?!\*)/;
const regexpJSDocLine = /^\s*\* ?(?<value>.*)$/;
export interface NodeJSDocDissect {
	cooked: ContextSlice;
	raw: ContextSlice;
}
export function dissectNodeJSDocLine(node: Deno.lint.BlockComment): NodeJSDocDissect[] | undefined {
	if (!regexpJSDocDirective.test(node.value)) {
		return;
	}
	return dissectNodeBlockCommentLine(node).map((line: NodeBlockCommentLine, index: number): NodeJSDocDissect => {
		let rawRangeBegin: number;
		let rawValue: string;
		let cookedValue: string;
		if (index === 0) {
			rawRangeBegin = line.range[0] + 1;
			rawValue = line.value.slice(1);
			cookedValue = rawValue.startsWith(" ") ? rawValue.slice(1) : rawValue;
		} else {
			rawRangeBegin = line.range[0];
			rawValue = line.value;
			cookedValue = rawValue.match(regexpJSDocLine)?.groups?.value ?? rawValue;
		}
		const cookedRangeBegin: number = rawRangeBegin + ((cookedValue.length === 0) ? rawValue.length : rawValue.lastIndexOf(cookedValue));
		return {
			cooked: {
				range: [cookedRangeBegin, cookedRangeBegin + cookedValue.length],
				value: cookedValue
			},
			raw: {
				range: [rawRangeBegin, line.range[1]],
				value: rawValue
			}
		};
	});
}
export function dissectNodeJSDocBlock(node: Deno.lint.BlockComment): NodeJSDocDissect[] | undefined {
	const lines: NodeJSDocDissect[] | undefined = dissectNodeJSDocLine(node);
	if (typeof lines === "undefined") {
		return;
	}
	const offset: number = node.range[0] + 2;
	const result: NodeJSDocDissect[] = [];
	for (let index: number = 0; index < lines.length; index += 1) {
		const current: NodeJSDocDissect = lines[index];
		if (current.cooked.value.trim().length === 0) {
			result.push(current);
		} else {
			const block: NodeJSDocDissect[] = [current];
			while ((index + 1) < lines.length) {
				const next: NodeJSDocDissect = lines[index + 1];
				if (next.cooked.value.trim().startsWith("@")) {
					break;
				}
				block.push(next);
				index += 1;
			}
			while (block.at(-1)!.cooked.value.trim().length === 0) {
				block.pop();
				index -= 1;
			}
			const blockStart: NodeJSDocDissect = block[0];
			const blockEnd: NodeJSDocDissect = block.at(-1)!;
			const rawRangeBegin: number = blockStart.raw.range[0];
			const rawRangeEnd: number = blockEnd.raw.range[1];
			result.push({
				cooked: {
					range: [blockStart.cooked.range[0], blockEnd.cooked.range[1]],
					value: block.map((line: NodeJSDocDissect): string => {
						return line.cooked.value;
					}).join("\n")
				},
				raw: {
					range: [rawRangeBegin, rawRangeEnd],
					value: node.value.slice(rawRangeBegin - offset, rawRangeEnd - offset)
				}
			});
		}
	}
	return result;
}
//#endregion
//#region Literal
export interface NodeBigIntLiteralDissect {
	base: string | null;
	integer: string;
	integerIndexBegin: number;
}
const regexpBigIntLiteralBase = /^(?<base>0[BOXbox])(?<integer>[\dA-F_a-f]+)n$/;
const regexpBigIntLiteralRaw = /^(?<integer>[\d_]+)n$/;
export function dissectNodeBigIntLiteral(node: Deno.lint.BigIntLiteral): NodeBigIntLiteralDissect | undefined {
	if (regexpBigIntLiteralBase.test(node.raw)) {
		const {
			base,
			integer
		} = node.raw.match(regexpBigIntLiteralBase)!.groups!;
		return {
			base,
			integer,
			integerIndexBegin: 2
		};
	}
	if (regexpBigIntLiteralRaw.test(node.raw)) {
		const { integer } = node.raw.match(regexpBigIntLiteralRaw)!.groups!;
		return {
			base: null,
			integer,
			integerIndexBegin: 0
		};
	}
	console.info(`Unable to parse big integer literal node \`${node.raw}\`! Probably new syntax.`);
	return undefined;
}
export interface NodeNumberLiteralDissect {
	base: string | null;
	exponent: string | null;
	exponentIndexBegin: number | null;
	float: string | null;
	floatIndexBegin: number | null;
	integer: string | null;
	integerIndexBegin: number | null;
}
const regexpNumberLiteralBase = /^(?<base>0[BOXbox])(?<integer>[\dA-F_a-f]+)$/;
const regexpNumberLiteralRaw = /^(?<integer>[\d_]+)?(?<float>\.[\d_]*)?(?<exponent>[Ee][+\-]?[\d_]+)?$/;
export function dissectNodeNumberLiteral(node: Deno.lint.NumberLiteral): NodeNumberLiteralDissect | undefined {
	if (regexpNumberLiteralBase.test(node.raw)) {
		const {
			base,
			integer
		} = node.raw.match(regexpNumberLiteralBase)!.groups!;
		return {
			base,
			integer,
			integerIndexBegin: 2,
			exponent: null,
			exponentIndexBegin: null,
			float: null,
			floatIndexBegin: null
		};
	}
	const {
		exponent = null,
		float = null,
		integer = null
	} = node.raw.match(regexpNumberLiteralRaw)?.groups ?? {};
	if (exponent === null && float === null && integer === null) {
		console.info(`Unable to parse number literal node \`${node.raw}\`! Probably new syntax.`);
		return undefined;
	}
	return {
		base: null,
		integer,
		integerIndexBegin: (integer === null) ? null : node.raw.indexOf(integer),
		exponent,
		exponentIndexBegin: (exponent === null) ? null : node.raw.indexOf(exponent),
		float,
		floatIndexBegin: (float === null) ? null : node.raw.indexOf(float)
	};
}
export function isNodeBigIntLiteral(node: NodeAll): node is Deno.lint.BigIntLiteral {
	return (node.type === "Literal" && typeof node.value === "bigint");
}
export function isNodeBooleanLiteral(node: NodeAll): node is Deno.lint.BooleanLiteral {
	return (node.type === "Literal" && typeof node.value === "boolean");
}
export function isNodeNullLiteral(node: NodeAll): node is Deno.lint.NullLiteral {
	return (node.type === "Literal" && node.value === null);
}
export function isNodeNumberLiteral(node: NodeAll): node is Deno.lint.NumberLiteral {
	return (node.type === "Literal" && typeof node.value === "number");
}
export function isNodeRegExpLiteral(node: NodeAll): node is Deno.lint.RegExpLiteral {
	return (node.type === "Literal" && node.value instanceof RegExp);
}
export function isNodeStringLiteral(node: NodeAll): node is Deno.lint.StringLiteral {
	return (node.type === "Literal" && typeof node.value === "string");
}
//#endregion
//#region Path
export function resolveModuleRelativePath(from: string, to: string): string {
	const result: string = getPathRelative(getPathDirname(from), to).replaceAll("\\", "/");
	return ((
		result.startsWith("./") ||
		result.startsWith("../")
	) ? result : `./${result}`);
}
//#endregion
//#region Polyfill
/*
ESTree AST
=====
`import defer`: 
	- https://github.com/estree/estree/blob/master/stage3/defer-import-eval.md
	- https://github.com/estree/estree/blob/875bf70440a8870c4a663865a7a41300cf1add55/stage3/defer-import-eval.md
`import source`:
	- https://github.com/estree/estree/blob/master/stage3/source-phase-imports.md
	- https://github.com/estree/estree/blob/875bf70440a8870c4a663865a7a41300cf1add55/stage3/source-phase-imports.md
*/
export type ImportDeclarationPhasePolyfill =
	| "defer"
	| "source"
	| null;
export interface ImportDeclarationPolyfill extends Deno.lint.ImportDeclaration {
	phase: ImportDeclarationPhasePolyfill;
}
export interface ImportExpressionPolyfill extends Deno.lint.ImportExpression {
	phase: ImportDeclarationPhasePolyfill;
}
//#endregion
//#region Position
export interface NodeVisualPositionObject {
	columnBegin: number;
	columnEnd: number;
	lineBegin: number;
	lineEnd: number;
}
export class NodeVisualPosition {
	get [Symbol.toStringTag](): string {
		return "NodeVisualPosition";
	}
	#columnBegin: number;
	#columnEnd: number;
	#lineBegin: number;
	#lineEnd: number;
	constructor(context: string | Deno.lint.RuleContext, target: Deno.lint.Range | NodeAll) {
		const raw: string = (typeof context === "string") ? context : context.sourceCode.text;
		const [
			rangeBegin,
			rangeEnd
		]: Deno.lint.Range = Array.isArray(target) ? target : target.range;
		const slicesBegin: readonly string[] = raw.slice(0, rangeBegin).split("\n");
		const slicesEnd: readonly string[] = raw.slice(0, rangeEnd).split("\n");
		this.#lineBegin = slicesBegin.length;
		this.#columnBegin = slicesBegin.at(-1)!.length + 1;
		this.#lineEnd = slicesEnd.length;
		this.#columnEnd = slicesEnd.at(-1)!.length + 1;
	}
	get columnBegin(): number {
		return this.#columnBegin;
	}
	get columnEnd(): number {
		return this.#columnEnd;
	}
	get lineBegin(): number {
		return this.#lineBegin;
	}
	get lineEnd(): number {
		return this.#lineEnd;
	}
	get begin(): string {
		return `${this.#lineBegin}:${this.#columnBegin}`;
	}
	get end(): string {
		return `${this.#lineEnd}:${this.#columnEnd}`;
	}
	toObject(): NodeVisualPositionObject {
		return {
			columnBegin: this.#columnBegin,
			columnEnd: this.#columnEnd,
			lineBegin: this.#lineBegin,
			lineEnd: this.#lineEnd
		};
	}
	toString(): string {
		return `${this.begin} ~ ${this.end}`;
	}
}
//#endregion
//#region Serialize
export interface NodeSerializerOptions {
	typescript?: boolean;
}
export class NodeSerializer {
	get [Symbol.toStringTag](): string {
		return "NodeSerializer";
	}
	#typescript: boolean;
	constructor(options: NodeSerializerOptions = {}) {
		const { typescript = true } = options;
		this.#typescript = typescript;
	}
	for(node: NodeAll): string {
		try {
			switch (node.type) {
				case "AccessorProperty":
					break;
				case "ArrayExpression":
					return `[${node.elements.map((element: Deno.lint.Expression | Deno.lint.SpreadElement): string => {
						return ((element === null) ? "" : this.for(element));
					}).join(", ")}]`;
				case "ArrayPattern":
					return `[${node.elements.map((element: Deno.lint.ArrayPattern | Deno.lint.Identifier | Deno.lint.MemberExpression | Deno.lint.ObjectPattern | Deno.lint.AssignmentPattern | Deno.lint.RestElement | null): string => {
						return ((element === null) ? "" : this.for(element));
					}).join(", ")}]${(this.#typescript && node.optional) ? "?" : ""}${(this.#typescript && typeof node.typeAnnotation !== "undefined") ? this.for(node.typeAnnotation) : ""}`;
				case "ArrowFunctionExpression":
					return `${node.async ? "async " : ""}${node.generator ? "*" : ""}${(this.#typescript && typeof node.typeParameters !== "undefined") ? this.for(node.typeParameters) : ""}(${node.params.map((param) => {
						return this.for(param);
					}).join(", ")})${(this.#typescript && typeof node.returnType !== "undefined") ? this.for(node.returnType) : ""} => ${this.forBlock(node.body)}`;
				case "AssignmentExpression":
					return `${this.for(node.left)} ${node.operator} ${this.for(node.right)}`;
				case "AssignmentPattern":
					return `${this.for(node.left)} = ${this.for(node.right)}`;
				case "AwaitExpression":
					return `await ${this.for(node.argument)}`;
				case "BinaryExpression":
				case "LogicalExpression":
					return `(${this.for(node.left)} ${node.operator} ${this.for(node.right)})`;
				case "Block":
				case "Line":
					// Comment Block / Comment Line
					return "";
				case "BlockStatement":
					return `{\n${node.body.map((statement: Deno.lint.Statement): string => {
						return this.for(statement);
					}).join("\n")}\n}`;
				case "BreakStatement":
					return `break${(node.label === null) ? "" : ` ${this.for(node.label)}`}`;
				case "CallExpression":
					return `${this.for(node.callee)}${node.optional ? "?." : ""}${(this.#typescript && node.typeArguments !== null) ? this.for(node.typeArguments) : ""}(${node.arguments.map((argument: Deno.lint.Expression | Deno.lint.SpreadElement): string => {
						return this.for(argument);
					}).join(", ")})`;
				case "CatchClause":
					return `catch${(node.param === null) ? "" : ` (${this.for(node.param)})`} ${this.for(node.body)}`;
				case "ChainExpression":
					return this.for(node.expression);
				case "ClassBody":
					return `{\n${node.body.map((statement: Deno.lint.AccessorProperty | Deno.lint.MethodDefinition | Deno.lint.PropertyDefinition | Deno.lint.StaticBlock | Deno.lint.TSAbstractMethodDefinition | Deno.lint.TSAbstractPropertyDefinition | Deno.lint.TSIndexSignature): string => {
						return this.for(statement);
					}).sort().join("\n")}\n}`;
				case "ClassDeclaration":
					break;
				case "ClassExpression":
					break;
				case "ConditionalExpression":
					return `${this.for(node.test)} ? ${this.for(node.consequent)} : ${this.for(node.alternate)}`;
				case "ContinueStatement":
					return `continue${(node.label === null) ? "" : ` ${this.for(node.label)}`}`;
				case "DebuggerStatement":
					return `debugger`;
				case "Decorator":
					return `@${this.for(node.expression)}`;
				case "DoWhileStatement":
					return `do ${this.forBlock(node.body)} while (${this.for(node.test)})`;
				case "ExportAllDeclaration":
					return `export ${node.exportKind} * as ${(node.exported === null) ? "*" : this.for(node.exported)} from ${this.for(node.source)} with {${this.forImportAttributes(node.attributes)}}`;
				case "ExportDefaultDeclaration":
					return `export default ${this.for(node.declaration)}`;
				case "ExportNamedDeclaration":
					if (node.declaration === null) {
						return `export ${node.exportKind} {${node.specifiers.map((specifier: Deno.lint.ExportSpecifier): string => {
							return this.for(specifier);
						}).sort().join(", ")}}${(node.source === null) ? "" : ` from ${this.for(node.source)} with {${this.forImportAttributes(node.attributes)}}`}`;
					}
					return `export ${this.for(node.declaration)}`;
				case "ExportSpecifier":
					return `${node.exportKind} ${this.forKey(node.local)} as ${this.for(node.exported)}`;
				case "ExpressionStatement":
					return this.for(node.expression);
				case "ForInStatement":
					return `for (${this.for(node.left)} in ${this.for(node.right)}) ${this.forBlock(node.body)}`;
				case "ForOfStatement":
					return `for ${node.await ? "await " : ""}(${this.for(node.left)} of ${this.for(node.right)}) ${this.forBlock(node.body)}`;
				case "ForStatement":
					return `for (${(node.init === null) ? "" : this.for(node.init)}; ${(node.test === null) ? "" : this.for(node.test)}; ${(node.update === null) ? "" : this.for(node.update)}) ${this.forBlock(node.body)}`;
				case "FunctionDeclaration":
					break;
				case "FunctionExpression":
					break;
				case "Identifier":
					return `${node.name}${node.optional ? "?" : ""}${(this.#typescript && typeof node.typeAnnotation !== "undefined") ? this.for(node.typeAnnotation) : ""}`;
				case "IfStatement":
					return `if (${this.for(node.test)}) ${this.forBlock(node.consequent)}${(node.alternate === null) ? "" : ` else ${(node.alternate.type === "IfStatement") ? this.for(node.alternate) : this.forBlock(node.alternate)}`}`;
				case "ImportAttribute":
					return `${this.forKey(node.key)}: ${this.for(node.value)}`;
				case "ImportDeclaration":
					return `import ${node.importKind} {${node.specifiers.map((specifier: Deno.lint.ImportDefaultSpecifier | Deno.lint.ImportNamespaceSpecifier | Deno.lint.ImportSpecifier): string => {
						return this.for(specifier);
					}).sort().join(", ")}} from ${this.for(node.source)} with {${this.forImportAttributes(node.attributes)}}`;
				case "ImportDefaultSpecifier":
					return `default as ${this.for(node.local)}`;
				case "ImportExpression":
					return `import(${this.for(node.source)}${(node.options === null) ? "" : `, ${this.for(node.options)}`})`;
				case "ImportNamespaceSpecifier":
					return `* as ${this.for(node.local)}`;
				case "ImportSpecifier":
					return `${node.importKind} ${this.forKey(node.imported)} as ${this.for(node.local)}`;
				case "JSXAttribute":
					return `${this.for(node.name)}${(node.value === null) ? "" : ` = ${this.for(node.value)}`}`;
				case "JSXClosingElement":
					return `</${this.for(node.name)}>`;
				case "JSXClosingFragment":
					return "</>";
				case "JSXElement":
					return `${this.for(node.openingElement)}${this.forJSXChildren(node.children)}${(node.closingElement === null) ? `</${node.openingElement.name}>` : this.for(node.closingElement)}`;
				case "JSXEmptyExpression":
					return "";
				case "JSXExpressionContainer":
					return `{${this.for(node.expression)}}`;
				case "JSXFragment":
					return `${this.for(node.openingFragment)}${this.forJSXChildren(node.children)}${this.for(node.closingFragment)}`;
				case "JSXIdentifier":
					return node.name;
				case "JSXMemberExpression":
					return `${this.for(node.object)}.${this.for(node.property)}`;
				case "JSXNamespacedName":
					return `${this.for(node.namespace)}.${this.for(node.name)}`;
				case "JSXOpeningElement":
					return `<${this.for(node.name)}${(node.attributes.length > 0) ? ` ${node.attributes.map((attribute: Deno.lint.JSXAttribute | Deno.lint.JSXSpreadAttribute): string => {
						return this.for(attribute);
					}).sort().join(" ")}` : ""}>`;
				case "JSXOpeningFragment":
					return "<>";
				case "JSXSpreadAttribute":
					return `...${this.for(node.argument)}`;
				case "JSXText":
					return node.value;
				case "LabeledStatement":
					return `${this.for(node.label)}: ${this.for(node.body)}`;
				case "Literal":
					if (
						isNodeBigIntLiteral(node) ||
						isNodeBooleanLiteral(node) ||
						isNodeNumberLiteral(node)
					) {
						return String(node.value);
					}
					if (
						isNodeNullLiteral(node) ||
						isNodeRegExpLiteral(node)
					) {
						return node.raw;
					}
					if (isNodeStringLiteral(node)) {
						return JSON.stringify(node.value);
					}
					break;
				case "MemberExpression":
					return `${this.for(node.object)}${node.optional ? "?" : ""}.${this.for(node.property)}`;
				case "MetaProperty":
					return `${this.for(node.meta)}.${this.for(node.property)}`;
				case "MethodDefinition":
					break;
				case "NewExpression":
					return `new ${this.for(node.callee)}${(this.#typescript && typeof node.typeArguments !== "undefined") ? this.for(node.typeArguments) : ""}(${node.arguments.map((argument: Deno.lint.Expression | Deno.lint.SpreadElement): string => {
						return this.for(argument);
					}).join(", ")})`;
				case "ObjectExpression":
					return `{${node.properties.map((property: Deno.lint.SpreadElement | Deno.lint.Property): string => {
						return this.for(property);
					}).sort().join(", ")}}`;
				case "ObjectPattern":
					break;
				case "PrivateIdentifier":
					return `#${node.name}`;
				case "Program":
					return node.body.map((statement: Deno.lint.Statement): string => {
						return this.for(statement);
					}).join("\n");
				case "Property":
					break;
				case "PropertyDefinition":
					break;
				case "RestElement":
					return `...${this.for(node.argument)}${(this.#typescript && typeof node.typeAnnotation !== "undefined") ? this.for(node.typeAnnotation) : ""}`;
				case "ReturnStatement":
					return `return${(node.argument === null) ? "" : ` ${this.for(node.argument)}`}`;
				case "SequenceExpression":
					return node.expressions.map((expression: Deno.lint.Expression): string => {
						return this.for(expression);
					}).join(", ");
				case "SpreadElement":
					return `...${this.for(node.argument)}`;
				case "StaticBlock":
					return `static {\n${node.body.map((statement: Deno.lint.Statement): string => {
						return this.for(statement);
					}).join("\n")}\n}`;
				case "Super":
					return "super";
				case "SwitchCase":
					return `${(node.test === null) ? "default" : `case ${node.test}`}: ${node.consequent.map((statement: Deno.lint.Statement): string => {
						return this.for(statement);
					}).join("\n")}`;
				case "SwitchStatement":
					return `switch (${this.for(node.discriminant)}) {\n${node.cases.map((switchCase: Deno.lint.SwitchCase): string => {
						return this.for(switchCase);
					}).join("\n")}\n}`;
				case "TaggedTemplateExpression":
					return `${this.for(node.tag)}${(this.#typescript && typeof node.typeArguments !== "undefined") ? this.for(node.typeArguments) : ""}${this.for(node.quasi)}`;
				case "TemplateElement":
					return node.cooked;
				case "TemplateLiteral":
					if (node.quasis.length - 1 !== node.expressions.length) {
						break;
					}
					return `\`${node.quasis.map((quasi: Deno.lint.TemplateElement, index: number): string => {
						return `${this.for(quasi)}${quasi.tail ? "" : `\${${this.for(node.expressions[index])}}`}`;
					}).join("")}\``;
				case "ThisExpression":
					return "this";
				case "ThrowStatement":
					return `throw ${this.for(node.argument)}`;
				case "TryStatement":
					return `try ${this.for(node.block)}${(node.handler === null) ? "" : ` catch ${this.for(node.handler)}`}${(node.finalizer === null) ? "" : ` finally ${this.for(node.finalizer)}`}`;
				case "TSAbstractMethodDefinition":
					break;
				case "TSAbstractPropertyDefinition":
					break;
				case "TSAnyKeyword":
					return "any";
				case "TSArrayType": {
					const result: string = this.for(node.elementType);
					return `${(
						node.elementType.type === "TSFunctionType" ||
						node.elementType.type === "TSIntersectionType" ||
						node.elementType.type === "TSUnionType"
					) ? `(${result})` : result}[]`;
				}
				case "TSAsExpression":
					return `${this.for(node.expression)} as ${this.for(node.typeAnnotation)}`;
				case "TSBigIntKeyword":
					return "bigint";
				case "TSBooleanKeyword":
					return "boolean";
				case "TSCallSignatureDeclaration":
					break;
				case "TSClassImplements":
					break;
				case "TSConditionalType": {
					const resultFalse: string = this.for(node.falseType);
					const resultTrue: string = this.for(node.trueType);
					return `${this.for(node.checkType)} extends ${this.for(node.extendsType)} ? ${(node.trueType.type === "TSFunctionType") ? `(${resultTrue})` : resultTrue} : ${(node.falseType.type === "TSFunctionType") ? `(${resultFalse})` : resultFalse}`;
				}
				case "TSConstructSignatureDeclaration":
					break;
				case "TSDeclareFunction":
					break;
				case "TSEmptyBodyFunctionExpression":
					break;
				case "TSEnumBody":
					return `{${node.members.map((member: Deno.lint.TSEnumMember): string => {
						return this.for(member);
					}).sort().join(", ")}}`;
				case "TSEnumDeclaration":
					return `${node.declare ? "declare " : ""}${node.const ? "const " : ""}enum ${this.for(node.id)} ${this.for(node.body)}`;
				case "TSEnumMember":
					return `${this.for(node.id)}${(typeof node.initializer === "undefined") ? "" : ` = ${this.for(node.initializer)}`}`;
				case "TSExportAssignment":
					return `export = ${this.for(node.expression)}`;
				case "TSExternalModuleReference":
					break;
				case "TSFunctionType":
					break;
				case "TSImportEqualsDeclaration":
					break;
				case "TSImportType":
					break;
				case "TSIndexedAccessType":
					break;
				case "TSIndexSignature":
					break;
				case "TSInferType":
					return `infer ${this.for(node.typeParameter)}`;
				case "TSInstantiationExpression":
					break;
				case "TSInterfaceBody":
					return `{\n${node.body.map((property: Deno.lint.TSCallSignatureDeclaration | Deno.lint.TSConstructSignatureDeclaration | Deno.lint.TSIndexSignature | Deno.lint.TSMethodSignature | Deno.lint.TSPropertySignature): string => {
						return this.for(property);
					}).sort().join("\n")}\n}`;
				case "TSInterfaceDeclaration":
					return `interface ${this.for(node.id)}${(typeof node.typeParameters === "undefined") ? "" : this.for(node.typeParameters)}${(node.extends.length > 0) ? `extends ${node.extends.map((extend: Deno.lint.TSInterfaceHeritage): string => {
						return this.for(extend);
					}).sort().join(", ")}` : ""} ${this.for(node.body)}`;
				case "TSInterfaceHeritage":
					return `${this.for(node.expression)}${(typeof node.typeArguments === "undefined") ? "" : this.for(node.typeArguments)}`;
				case "TSIntersectionType":
					return `(${node.types.map((type: Deno.lint.TypeNode): string => {
						return this.for(type);
					}).sort().join(" & ")})`;
				case "TSIntrinsicKeyword":
					return "intrinsic";
				case "TSLiteralType":
					return this.for(node.literal);
				case "TSMappedType":
					break;
				case "TSMethodSignature":
					break;
				case "TSModuleBlock":
					return `{\n${node.body.map((statement: Deno.lint.Statement): string => {
						return this.for(statement);
					}).sort().join("\n")}\n}`;
				case "TSModuleDeclaration":
					return `${node.declare ? "declare " : ""}${node.kind} ${this.for(node.id)}${(typeof node.body === "undefined") ? "" : ` ${this.for(node.body)}`}`;
				case "TSNamedTupleMember":
					return `${this.for(node.label)}${node.optional ? "?" : ""}: ${this.for(node.elementType)}`;
				case "TSNamespaceExportDeclaration":
					break;
				case "TSNeverKeyword":
					return "never";
				case "TSNonNullExpression":
					return `${this.for(node.expression)}!`;
				case "TSNullKeyword":
					return "null";
				case "TSNumberKeyword":
					return "number";
				case "TSObjectKeyword":
					return "object";
				case "TSOptionalType":
					break;
				case "TSParameterProperty":
					break;
				case "TSPropertySignature":
					return `${node.static ? "static " : ""}${node.readonly ? "readonly " : ""}${node.computed ? `[${this.for(node.key)}]` : this.for(node.key)}${node.optional ? "?" : ""}${(typeof node.typeAnnotation === "undefined") ? "" : this.for(node.typeAnnotation)}`;
				case "TSQualifiedName":
					return `${this.for(node.left)}.${this.for(node.right)}`;
				case "TSRestType":
					return `...${this.for(node.typeAnnotation)}`;
				case "TSSatisfiesExpression":
					break;
				case "TSStringKeyword":
					return "string";
				case "TSSymbolKeyword":
					return "symbol";
				case "TSTemplateLiteralType":
					if (node.quasis.length - 1 !== node.types.length) {
						break;
					}
					return `\`${node.quasis.map((quasi: Deno.lint.TemplateElement, index: number): string => {
						return `${this.for(quasi)}${quasi.tail ? "" : `\${${this.for(node.types[index])}}`}`;
					}).join("")}\``;
				case "TSThisType":
					return "this";
				case "TSTupleType":
					return `[${node.elementTypes.map((element: Deno.lint.TypeNode): string => {
						return this.for(element);
					}).join(", ")}]`;
				case "TSTypeAliasDeclaration":
					break;
				case "TSTypeAnnotation":
					return `: ${this.for(node.typeAnnotation)}`;
				case "TSTypeAssertion":
					break;
				case "TSTypeLiteral":
					return `{\n${node.members.map((member: Deno.lint.TSCallSignatureDeclaration | Deno.lint.TSConstructSignatureDeclaration | Deno.lint.TSIndexSignature | Deno.lint.TSMethodSignature | Deno.lint.TSPropertySignature): string => {
						return this.for(member);
					}).sort().join("\n")}\n}`;
				case "TSTypeOperator":
					return `${node.operator} ${this.for(node.typeAnnotation)}`;
				case "TSTypeParameter":
					break;
				case "TSTypeParameterDeclaration":
					return `<${node.params.map((param: Deno.lint.TSTypeParameter): string => {
						return this.for(param);
					}).join(", ")}>`;
				case "TSTypeParameterInstantiation":
					return `<${node.params.map((param: Deno.lint.TypeNode): string => {
						return this.for(param);
					}).join(", ")}>`;
				case "TSTypePredicate":
					break;
				case "TSTypeQuery":
					break;
				case "TSTypeReference":
					return `${this.for(node.typeName)}${(typeof node.typeArguments === "undefined") ? "" : this.for(node.typeArguments)}`;
				case "TSUndefinedKeyword":
					return "undefined";
				case "TSUnionType":
					return `(${node.types.map((type: Deno.lint.TypeNode): string => {
						return this.for(type);
					}).sort().join(" | ")})`;
				case "TSUnknownKeyword":
					return "unknown";
				case "TSVoidKeyword":
					return "void";
				case "UnaryExpression":
					return `${node.operator} ${this.for(node.argument)}`;
				case "UpdateExpression":
					return (node.prefix ? `${node.operator}${this.for(node.argument)}` : `${this.for(node.argument)}${node.operator}`);
				case "VariableDeclaration":
					return `${node.kind} ${node.declarations.map((declaration: Deno.lint.VariableDeclarator): string => {
						return this.for(declaration);
					}).sort().join(", ")}`;
				case "VariableDeclarator":
					return `${this.for(node.id)}${(node.init === null) ? "" : ` = ${this.for(node.init)}`}`;
				case "WhileStatement":
					return `while (${this.for(node.test)}) ${this.forBlock(node.body)}`;
				case "WithStatement":
					return `with (${this.for(node.object)}) ${this.forBlock(node.body)}`;
				case "YieldExpression":
					return `yield${node.delegate ? "*" : ""}${(node.argument === null) ? "" : ` ${this.for(node.argument)}`}`;
			}
		} catch {
			// CONTINUE
		}
		return `[Node ${node.type} ${crypto.randomUUID().replaceAll("-", "").toUpperCase()}]`;
	}
	forBlock(node: NodeAll): string {
		return ((node.type === "BlockStatement") ? this.for(node) : `{${this.for(node)};}`);
	}
	forImportAttributes(importAttributes: readonly Deno.lint.ImportAttribute[]): string {
		return importAttributes.map((importAttribute: Deno.lint.ImportAttribute): string => {
			return this.for(importAttribute);
		}).sort().join(", ");
	}
	forInterfaceContext(node: Deno.lint.TSInterfaceDeclaration): string {
		return [...node.extends.map((extend: Deno.lint.TSInterfaceHeritage): string => {
			return this.for(extend);
		}).sort(), this.for(node.body)].join(" & ");
	}
	forJSXChildren(jsxChildren: readonly Deno.lint.JSXChild[]): string {
		return jsxChildren.map((jsxChild: Deno.lint.JSXChild): string => {
			return this.for(jsxChild);
		}).join("");
	}
	forKey(node: Deno.lint.Identifier | Deno.lint.Literal): string {
		if (node.type === "Identifier") {
			return node.name;
		}
		return String(node.value);
	}
	forSource(source: Deno.lint.StringLiteral, attributes: readonly Deno.lint.ImportAttribute[]): string {
		return `${source.value}::{${this.forImportAttributes(attributes)}}`;
	}
}
//#endregion
//#region Visitor
export type RuleAssertorDependFrom = (source: Deno.lint.StringLiteral) => void;
export function constructVisitorDependFrom(assertor: RuleAssertorDependFrom): Pick<Deno.lint.LintVisitor, "ExportAllDeclaration" | "ExportNamedDeclaration" | "ImportDeclaration" | "ImportExpression"> {
	return {
		...constructVisitorExportFrom(assertor),
		...constructVisitorImportFrom(assertor)
	};
}
export function constructVisitorExportFrom(assertor: RuleAssertorDependFrom): Pick<Deno.lint.LintVisitor, "ExportAllDeclaration" | "ExportNamedDeclaration"> {
	return {
		ExportAllDeclaration(node: Deno.lint.ExportAllDeclaration): void {
			assertor(node.source);
		},
		ExportNamedDeclaration(node: Deno.lint.ExportNamedDeclaration): void {
			if (node.source !== null) {
				assertor(node.source);
			}
		}
	};
}
export function constructVisitorImportFrom(assertor: RuleAssertorDependFrom): Pick<Deno.lint.LintVisitor, "ImportDeclaration" | "ImportExpression"> {
	return {
		ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
			assertor(node.source);
		},
		ImportExpression(node: Deno.lint.ImportExpression): void {
			if (isNodeStringLiteral(node.source)) {
				assertor(node.source);
			}
		}
	};
}
export function* visitNodeBlockComment(context: Deno.lint.RuleContext): Generator<Deno.lint.BlockComment> {
	for (const node of context.sourceCode.getAllComments()) {
		if (node.type === "Block") {
			yield node;
		}
	}
}
export function* visitNodeLineComment(context: Deno.lint.RuleContext): Generator<Deno.lint.LineComment> {
	for (const node of context.sourceCode.getAllComments()) {
		if (node.type === "Line") {
			yield node;
		}
	}
}
//#endregion
