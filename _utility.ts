import {
	dirname as getPathDirname,
	relative as getPathRelative
} from "node:path";
export type RuleSet =
	| "all"
	| "baseline"
	| "efficiency"
	| "mistake"
	| "no-interaction"
	| "recommended"
	| "security"
	| "simplify";
export interface RuleData<T = undefined> {
	identifier: string;
	sets?: readonly Exclude<RuleSet, "all">[];
	context: (options?: T) => Deno.lint.Rule;
}
export function constructPlugin(rules: Record<string, Deno.lint.Rule>): Deno.lint.Plugin {
	if (Object.entries(rules).length === 0) {
		throw new TypeError(`Parameter \`rules\` is not defined!`);
	}
	return {
		name: "hugoalh",
		rules
	};
}
export function* getStringCodePoints(input: string): Generator<number> {
	let index: number = 0;
	while (index < input.length) {
		const codePoint: number = input.codePointAt(index)!;
		yield codePoint;
		index += String.fromCodePoint(codePoint).length;
	}
}
export class IdenticalGrouper<T> {
	#entries: Record<string, T[]> = {};
	add(key: string, value: T): this {
		this.#entries[key] ??= [];
		this.#entries[key].push(value);
		return this;
	}
	entries(): [string, T[]][] {
		return Object.entries(this.#entries);
	}
	values(): T[][] {
		return Object.values(this.#entries);
	}
}
//#region Context
export type ContextPositionArray = [
	lineBegin: number,
	columnBegin: number,
	lineEnd: number,
	columnEnd: number
];
export interface ContextPositionObject {
	columnBegin: number;
	columnEnd: number;
	lineBegin: number;
	lineEnd: number;
}
export function getContextPosition(raw: string, rangeBegin: number, rangeEnd: number): ContextPositionObject {
	const slicesBegin: readonly string[] = raw.slice(0, rangeBegin).split("\n");
	const lineBegin: number = slicesBegin.length;
	const columnBegin: number = slicesBegin[lineBegin - 1].length + 1;
	const slicesEnd: readonly string[] = raw.slice(0, rangeEnd).split("\n");
	const lineEnd: number = slicesEnd.length;
	const columnEnd: number = slicesEnd[lineEnd - 1].length + 1;
	return {
		columnBegin,
		columnEnd,
		lineBegin,
		lineEnd
	};
}
export function getContextPositionForDiagnostics(raw: string, diagnostics: readonly Deno.lint.Diagnostic[]): readonly Readonly<ContextPositionArray>[] {
	return diagnostics.map((diagnostic: Deno.lint.Diagnostic): Readonly<ContextPositionArray> => {
		const {
			columnBegin,
			columnEnd,
			lineBegin,
			lineEnd
		}: ContextPositionObject = getContextPosition(raw, ...diagnostic.range);
		return [
			lineBegin,
			columnBegin,
			lineEnd,
			columnEnd
		];
	});
}
export function getContextPositionFromNode(context: Deno.lint.RuleContext, node: Deno.lint.Node): ContextPositionObject {
	return getContextPosition(context.sourceCode.text, ...node.range);
}
export function getContextPositionStringFromNode(context: Deno.lint.RuleContext, node: Deno.lint.Node): string {
	const {
		columnBegin,
		columnEnd,
		lineBegin,
		lineEnd
	}: ContextPositionObject = getContextPositionFromNode(context, node);
	return `Line ${lineBegin} Column ${columnBegin} ~ Line ${lineEnd} Column ${columnEnd}`;
}
export function getContextTextFromNodes(context: Deno.lint.RuleContext, nodes: readonly Deno.lint.Node[]): string {
	if (nodes.length === 0) {
		throw new Error(`Parameter \`nodes\` is empty!`);
	}
	const [
		firstRangeBegin,
		firstRangeEnd
	]: Deno.lint.Range = nodes[0].range;
	const [
		lastRangeBegin,
		lastRangeEnd
	]: Deno.lint.Range = nodes[nodes.length - 1].range;
	if (!(firstRangeBegin < lastRangeEnd)) {
		throw new RangeError(`Invalid nodes range! Begin: ${firstRangeBegin}~${firstRangeEnd}; End: ${lastRangeBegin}~${lastRangeEnd}.`);
	}
	return context.sourceCode.text.slice(firstRangeBegin, lastRangeEnd);
}
//#endregion
//#region Fixer
export function generateFixerExtractBlock(fixer: Deno.lint.Fixer, node: Deno.lint.BlockStatement): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
	const [
		rangeBegin,
		rangeEnd
	]: Deno.lint.Range = node.range;
	return [
		fixer.removeRange([rangeBegin, rangeBegin + 1]),
		fixer.removeRange([rangeEnd - 1, rangeEnd])
	];
}
//#endregion
//#region Node
export function areNodesSame(nodes: readonly Deno.lint.Node[], context?: Deno.lint.RuleContext): boolean {
	if (nodes.length < 2) {
		throw new Error(`Parameter \`nodes\` is empty or invalid!`);
	}
	for (let index: number = 0; index < nodes.length - 1; index += 1) {
		const a: Deno.lint.Node = nodes[index];
		const b: Deno.lint.Node = nodes[index + 1];
		if (
			a.type !== b.type ||
			a.range[0] !== b.range[0] ||
			a.range[1] !== b.range[1] ||
			(typeof context !== "undefined" && context.sourceCode.getText(a) !== context.sourceCode.getText(b))
		) {
			return false;
		}
	}
	return true;
}
export interface NodeNumericLiteralDissectMeta {
	// NOTE: Sign of the numeric is exist in parent node.
	/**
	 * Base of the numeric.
	 * @example
	 * "0b"
	 * @example
	 * "0x"
	 */
	base: string | null;
	baseFmt: string | null;
	/**
	 * Exponent of the numeric.
	 * @example
	 * "e5"
	 */
	exponent: string | null;
	exponentIndexBegin: number | null;
	float: string | null;
	floatIndexBegin: number | null;
	integer: string;
	integerIndexBegin: number;
}
export function dissectNumericLiteral(node: Deno.lint.BigIntLiteral | Deno.lint.NumberLiteral): NodeNumericLiteralDissectMeta {
	let raw: string = node.raw;
	let base: string | null = null;
	let baseFmt: string | null = null;
	let exponent: string | null = null;
	let exponentIndexBegin: number | null = null;
	let float: string | null = null;
	let floatIndexBegin: number | null = null;
	let integerIndexBegin: number = 0;

	// Base
	if (
		raw.startsWith("0b") ||
		raw.startsWith("0B") ||
		raw.startsWith("0o") ||
		raw.startsWith("0O") ||
		raw.startsWith("0x") ||
		raw.startsWith("0X")
	) {
		base = raw.slice(0, 2);
		baseFmt = base.toLowerCase();
		raw = raw.slice(2);
		integerIndexBegin = 2;
	}

	if (isNodeBigIntLiteral(node)) {
		// NOTE: Big interger does not have exponent and float.
		return {
			base,
			baseFmt,
			exponent,
			exponentIndexBegin,
			float,
			floatIndexBegin,
			integer: raw.slice(0, raw.length - 1),
			integerIndexBegin
		};
	}

	if (base === null) {
		// Exponent
		exponentIndexBegin = Math.max(raw.lastIndexOf("e"), raw.lastIndexOf("E"));
		if (exponentIndexBegin >= 0) {
			exponent = raw.slice(exponentIndexBegin);
			raw = raw.slice(0, exponentIndexBegin);
		} else {
			exponentIndexBegin = null;
		}

		// Float
		floatIndexBegin = raw.lastIndexOf(".");
		if (floatIndexBegin >= 0) {
			float = raw.slice(floatIndexBegin + 1);
			raw = raw.slice(0, floatIndexBegin);
		} else {
			floatIndexBegin = null;
		}
	}
	return {
		base,
		baseFmt,
		exponent,
		exponentIndexBegin,
		float,
		floatIndexBegin,
		integer: raw,
		integerIndexBegin
	};
}
export function getCommentsFromRange(context: Deno.lint.RuleContext, rangeBegin: number, rangeEnd: number): (Deno.lint.BlockComment | Deno.lint.LineComment)[] {
	return context.sourceCode.getAllComments().filter(({
		range: [
			commentBegin,
			commentEnd
		]
	}: Deno.lint.BlockComment | Deno.lint.LineComment): boolean => {
		if (
			(commentBegin < rangeBegin && commentEnd <= rangeBegin) ||
			(rangeEnd <= commentBegin && rangeEnd < commentEnd)
		) {
			return false;
		}
		if (rangeBegin <= commentBegin && commentEnd <= rangeEnd) {
			return true;
		}
		console.warn(`Defined range is splitted comment! Range: ${rangeBegin}~${rangeEnd}; Comment: ${commentBegin}~${commentEnd}.`);
		return true;
	});
}
export function getMemberRootIdentifier(node: Deno.lint.Node): Deno.lint.Identifier | null {
	let target: Deno.lint.Node = node;
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
export function isBlockHasDeclaration(node: Deno.lint.BlockStatement | Deno.lint.Program): boolean {
	return node.body.some((statement: Deno.lint.Statement): boolean => {
		return (
			statement.type === "ClassDeclaration" ||
			statement.type === "FunctionDeclaration" ||
			statement.type === "TSEnumDeclaration" ||
			statement.type === "TSInterfaceDeclaration" ||
			statement.type === "TSModuleDeclaration" ||
			statement.type === "TSTypeAliasDeclaration" ||
			(statement.type === "VariableDeclaration" && statement.kind !== "var")
		);
	});
}
const prefixGlobalsName: readonly string[] = [
	"globalThis",
	"self",
	"window"
];
export function isMemberExpressionMatchPattern(node: Deno.lint.MemberExpression, pattern: readonly string[], prefixGlobals: boolean = false): boolean {
	if (pattern.length === 0) {
		throw new Error(`Parameter \`pattern\` is empty!`);
	}
	let target: Deno.lint.Node = node;
	for (let index: number = pattern.length - 1; index >= 0; index -= 1) {
		const part: string = pattern[index];
		if (target.type === "Identifier") {
			return (prefixGlobals ? false : (index === 0 && target.name === part));
		}
		if (target.type === "MemberExpression") {
			if (
				(
					index > 0 ||
					(prefixGlobals && index === 0)
				) && (
					(target.property.type === "Identifier" && target.property.name === part) ||
					(target.property.type === "Literal" && target.property.value === part)
				)
			) {
				target = target.object;
				continue;
			}
			return false;
		}
		return false;
	}
	while (prefixGlobals) {
		if (target.type === "Identifier") {
			return prefixGlobalsName.includes(target.name);
		}
		if (target.type === "MemberExpression") {
			if (
				(target.property.type === "Identifier" && prefixGlobalsName.includes(target.property.name)) ||
				(target.property.type === "Literal" && isNodeStringLiteral(target.property) && prefixGlobalsName.includes(target.property.value))
			) {
				target = target.object;
				continue;
			}
			return false;
		}
		return false;
	}
	return false;
}
export function isNodeNoOperation(node: Deno.lint.Node): boolean {
	switch (node.type) {
		case "ArrowFunctionExpression":
		case "Identifier":
		case "Literal":
			return true;
		case "ArrayExpression":
			return node.elements.every((element: Deno.lint.Expression | Deno.lint.SpreadElement): boolean => {
				return isNodeNoOperation(element);
			});
		case "TemplateLiteral":
			return node.expressions.every((expression: Deno.lint.Expression): boolean => {
				return isNodeNoOperation(expression);
			});
	}
	return false;
}
export function isNodeBigIntLiteral(node: Deno.lint.Node): node is Deno.lint.BigIntLiteral {
	return (node.type === "Literal" && typeof node.value === "bigint");
}
export function isNodeBooleanLiteral(node: Deno.lint.Node): node is Deno.lint.BooleanLiteral {
	return (node.type === "Literal" && typeof node.value === "boolean");
}
export function isNodeNullLiteral(node: Deno.lint.Node): node is Deno.lint.NullLiteral {
	return (node.type === "Literal" && node.value === null);
}
export function isNodeNumberLiteral(node: Deno.lint.Node): node is Deno.lint.NumberLiteral {
	return (node.type === "Literal" && typeof node.value === "number");
}
export function isNodeJSDoc(node: Deno.lint.Node): boolean {
	return (node.type === "Block" && node.value.startsWith("*"));
}
export function isNodeRegExpLiteral(node: Deno.lint.Node): node is Deno.lint.RegExpLiteral {
	return (node.type === "Literal" && node.value instanceof RegExp);
}
export function isNodeStringLiteral(node: Deno.lint.Node): node is Deno.lint.StringLiteral {
	return (node.type === "Literal" && typeof node.value === "string");
}
export function* iterateNodeChildren(node: Deno.lint.Node, depth: number = Infinity): Generator<Deno.lint.Node> {
	if (!(
		depth === Infinity ||
		(Number.isSafeInteger(depth) && depth >= 0)
	)) {
		throw new RangeError(`Parameter \`depth\` is not \`Infinity\`, or a valid number which is integer, positive, and safe!`);
	}
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
				yield* iterateNodeChildren(element, depth);
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
		if (depth > 0) {
			yield* iterateNodeChildren(value, depth - 1);
		}
	}
}
export interface NodeSerializeOptions {
	typescript?: boolean;
}
export class NodeSerialize {
	get [Symbol.toStringTag](): string {
		return "NodeSerialize";
	}
	#typescript: boolean;
	constructor(options: NodeSerializeOptions = {}) {
		const { typescript = true } = options;
		this.#typescript = typescript;
	}
	#forceBlock(node: Deno.lint.Node): string {
		return ((node.type === "BlockStatement") ? this.from(node) : `{\n\t${this.from(node)}\n}`);
	}
	from(node: Deno.lint.Node | Deno.lint.AccessorProperty): string {
		//deno-lint-ignore hugoalh/no-useless-try
		try {
			switch (node.type) {
				case "AccessorProperty":
					break;
				case "ArrayExpression":
					return `[${node.elements.map((element: Deno.lint.Expression | Deno.lint.SpreadElement): string => {
						return this.from(element);
					}).join(", ")}]`;
				case "ArrayPattern":
					return `[${node.elements.map((element: Deno.lint.ArrayPattern | Deno.lint.Identifier | Deno.lint.MemberExpression | Deno.lint.ObjectPattern | Deno.lint.AssignmentPattern | Deno.lint.RestElement | null): string => {
						return ((element === null) ? "" : this.from(element));
					}).join(", ")}]${(this.#typescript && node.optional) ? "?" : ""}${(this.#typescript && typeof node.typeAnnotation !== "undefined") ? this.from(node.typeAnnotation) : ""}`;
				case "ArrowFunctionExpression":
					break;
				case "AssignmentExpression":
					return `${this.from(node.left)} ${node.operator} ${this.from(node.right)}`;
				case "AssignmentPattern":
					return `${this.from(node.left)} = ${this.from(node.right)}`;
				case "AwaitExpression":
					return `await ${this.from(node.argument)}`;
				case "BinaryExpression":
				case "LogicalExpression":
					return `(${this.from(node.left)} ${node.operator} ${this.from(node.right)})`;
				case "Block":
				case "Line":
					return "";
				case "BlockStatement":
					return `{\n\t${node.body.map((statement: Deno.lint.Statement): string => {
						return this.from(statement);
					}).join("\n\t")}\n}`;
				case "BreakStatement":
					return `break${(node.label === null) ? "" : ` ${this.from(node.label)}`}`;
				case "CallExpression":
					return `${this.from(node.callee)}${node.optional ? "?." : ""}${(this.#typescript && node.typeArguments !== null) ? this.from(node.typeArguments) : ""}(${node.arguments.map((argument: Deno.lint.Expression | Deno.lint.SpreadElement): string => {
						return this.from(argument);
					}).join(", ")})`;
				case "CatchClause":
					return `catch${(node.param === null) ? "" : ` (${this.from(node.param)})`} ${this.from(node.body)}`;
				case "ChainExpression":
					return this.from(node.expression);
				case "ClassBody":
					return `{\n\t${node.body.map((statement: Deno.lint.AccessorProperty | Deno.lint.MethodDefinition | Deno.lint.PropertyDefinition | Deno.lint.StaticBlock | Deno.lint.TSAbstractMethodDefinition | Deno.lint.TSAbstractPropertyDefinition | Deno.lint.TSIndexSignature): string => {
						return this.from(statement);
					}).sort().join("\n\t")}\n}`;
				case "ClassDeclaration":
					break;
				case "ClassExpression":
					break;
				case "ConditionalExpression":
					return `${this.from(node.test)} ? ${this.from(node.consequent)} : ${this.from(node.alternate)}`;
				case "ContinueStatement":
					return `continue${(node.label === null) ? "" : ` ${this.from(node.label)}`}`;
				case "DebuggerStatement":
					return `debugger`;
				case "Decorator":
					return `@${this.from(node.expression)}`;
				case "DoWhileStatement":
					return `do ${this.#forceBlock(node.body)} while (${this.from(node.test)})`;
				case "ExportAllDeclaration":
					return `export${(node.exportKind === "type") ? " type" : ""} * as ${this.from(node.exported!)} from ${this.from(node.source)} with {\n\t${node.attributes.map((attribute: Deno.lint.ImportAttribute): string => {
						return this.from(attribute);
					}).sort().join(",\n\t")}\n}`;
				case "ExportDefaultDeclaration":
					return `export default ${this.from(node.declaration)}`;
				case "ExportNamedDeclaration":
					break;
				case "ExportSpecifier":
					return `${(node.exportKind === "type") ? "type " : ""}${this.from(node.local)} as ${this.from(node.exported)}`;
				case "ExpressionStatement":
					return this.from(node.expression);
				case "ForInStatement":
					return `for (${this.from(node.left)} in ${this.from(node.right)}) ${this.from(node.body)}`;
				case "ForOfStatement":
					return `for ${node.await ? "await " : ""}(${this.from(node.left)} of ${this.from(node.right)}) ${this.from(node.body)}`;
				case "ForStatement":
					break;
				case "FunctionDeclaration":
					break;
				case "FunctionExpression":
					break;
				case "Identifier":
					return `${node.name}${node.optional ? "?" : ""}${(this.#typescript && typeof node.typeAnnotation !== "undefined") ? this.from(node.typeAnnotation) : ""}`;
				case "IfStatement":
					return `if (${this.from(node.test)}) ${this.#forceBlock(node.consequent)}${(node.alternate === null) ? "" : `else ${(
						node.alternate.type === "BlockStatement" ||
						node.alternate.type === "IfStatement"
					) ? this.from(node.alternate) : `{\n\t${this.from(node.alternate)}\n}`}`}`;
				case "ImportAttribute":
					return `${this.from(node.key)}: ${this.from(node.value)}`;
				case "ImportDeclaration":
					break;
				case "ImportDefaultSpecifier":
					return this.from(node.local);
				case "ImportExpression":
					return `import(${this.from(node.source)}${(node.options === null) ? "" : `, ${this.from(node.options)}`})`;
				case "ImportNamespaceSpecifier":
					return `* as ${this.from(node.local)}`;
				case "ImportSpecifier":
					return `${(node.importKind === "type") ? "type " : ""}${this.from(node.imported)} as ${this.from(node.local)}`;
				case "JSXAttribute":
					return `${this.from(node.name)}${(node.value === null) ? "" : ` = ${this.from(node.value)}`}`;
				case "JSXClosingElement":
					return `</${this.from(node.name)}>`;
				case "JSXClosingFragment":
					break;
				case "JSXElement":
					break;
				case "JSXEmptyExpression":
					break;
				case "JSXExpressionContainer":
					break;
				case "JSXFragment":
					break;
				case "JSXIdentifier":
					return node.name;
				case "JSXMemberExpression":
					return `${this.from(node.object)}.${this.from(node.property)}`;
				case "JSXNamespacedName":
					return `${this.from(node.namespace)}.${this.from(node.name)}`;
				case "JSXOpeningElement":
					break;
				case "JSXOpeningFragment":
					break;
				case "JSXSpreadAttribute":
					return `...${this.from(node.argument)}`;
				case "JSXText":
					return `"${node.value}"`;
				case "LabeledStatement":
					return `${this.from(node.label)}: ${this.from(node.body)}`;
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
						return `"${node.value}"`;
					}
					break;
				case "MemberExpression":
					return `${this.from(node.object)}${node.optional ? "?" : ""}.${this.from(node.property)}`;
				case "MetaProperty":
					return `${this.from(node.meta)}.${this.from(node.property)}`;
				case "MethodDefinition":
					break;
				case "NewExpression":
					return `new ${this.from(node.callee)}${(this.#typescript && typeof node.typeArguments !== "undefined") ? this.from(node.typeArguments) : ""}(${node.arguments.map((argument: Deno.lint.Expression | Deno.lint.SpreadElement): string => {
						return this.from(argument);
					}).join(", ")})`;
				case "ObjectExpression":
					return `{\n\t${node.properties.map((property: Deno.lint.SpreadElement | Deno.lint.Property): string => {
						return this.from(property);
					}).sort().join("\n\t")}\n}`;
				case "ObjectPattern":
					break;
				case "PrivateIdentifier":
					return `#${node.name}`;
				case "Program":
					return node.body.map((statement: Deno.lint.Statement): string => {
						return this.from(statement);
					}).join("\n");
				case "Property":
					break;
				case "PropertyDefinition":
					break;
				case "RestElement":
					break;
				case "ReturnStatement":
					return `return${(node.argument === null) ? "" : ` ${this.from(node.argument)}`}`;
				case "SequenceExpression":
					break;
				case "SpreadElement":
					return `...${this.from(node.argument)}`;
				case "StaticBlock":
					return `static {\n\t${node.body.map((statement: Deno.lint.Statement): string => {
						return this.from(statement);
					}).join("\n\t")}\n}`;
				case "Super":
					return "super";
				case "SwitchCase":
					return `${(node.test === null) ? "default" : `case ${node.test}`}: ${node.consequent.map((statement: Deno.lint.Statement): string => {
						return this.from(statement);
					}).join("\n")}`;
				case "SwitchStatement":
					return `switch (${this.from(node.discriminant)}) {\n\t${node.cases.map((switchCase: Deno.lint.SwitchCase): string => {
						return this.from(switchCase);
					})}\n}`;
				case "TaggedTemplateExpression":
					return `${this.from(node.tag)}${(this.#typescript && typeof node.typeArguments !== "undefined") ? this.from(node.typeArguments) : ""}${this.from(node.quasi)}`;
				case "TemplateElement":
					return node.cooked;
				case "TemplateLiteral": {
					if (node.quasis.length - 1 !== node.expressions.length) {
						break;
					}
					let result: string = "";
					for (let index: number = 0; index < node.quasis.length; index += 1) {
						const quasi: Deno.lint.TemplateElement = node.quasis[index];
						result += this.from(quasi);
						if (quasi.tail) {
							break;
						}
						result += `\${${this.from(node.expressions[index])}}`;
					}
					return `\`${result}\``;
				}
				case "ThisExpression":
					return "this";
				case "ThrowStatement":
					return `throw ${this.from(node.argument)}`;
				case "TryStatement":
					return `try ${this.from(node.block)}${(node.handler === null) ? "" : ` catch ${this.from(node.handler)}`}${(node.finalizer === null) ? "" : ` finally ${this.from(node.finalizer)}`}`;
				case "TSAbstractMethodDefinition":
					break;
				case "TSAbstractPropertyDefinition":
					break;
				case "TSAnyKeyword":
					return "any";
				case "TSArrayType": {
					const result: string = this.from(node.elementType);
					return `${(
						node.elementType.type === "TSFunctionType" ||
						node.elementType.type === "TSIntersectionType" ||
						node.elementType.type === "TSUnionType"
					) ? `(${result})` : result}[]`;
				}
				case "TSAsExpression":
					return `${this.from(node.expression)} as ${this.from(node.typeAnnotation)}`;
				case "TSBigIntKeyword":
					return "bigint";
				case "TSBooleanKeyword":
					return "boolean";
				case "TSCallSignatureDeclaration":
					break;
				case "TSClassImplements":
					break;
				case "TSConditionalType": {
					const resultFalse: string = this.from(node.falseType);
					const resultTrue: string = this.from(node.trueType);
					return `${this.from(node.checkType)} extends ${this.from(node.extendsType)} ? ${(node.trueType.type === "TSFunctionType") ? `(${resultTrue})` : resultTrue} : ${(node.falseType.type === "TSFunctionType") ? `(${resultFalse})` : resultFalse}`;
				}
				case "TSConstructSignatureDeclaration":
					break;
				case "TSDeclareFunction":
					break;
				case "TSEmptyBodyFunctionExpression":
					break;
				case "TSEnumBody":
					return `{\n\t${node.members.map((member: Deno.lint.TSEnumMember): string => {
						return this.from(member);
					}).sort().join(",\n\t")}\n}`;
				case "TSEnumDeclaration":
					return `${node.declare ? "declare " : ""}${node.const ? "const " : ""}enum ${this.from(node.id)} ${this.from(node.body)}`;
				case "TSEnumMember":
					return `${this.from(node.id)}${(typeof node.initializer === "undefined") ? "" : ` = ${this.from(node.initializer)}`}`;
				case "TSExportAssignment":
					return `export = ${this.from(node.expression)}`;
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
					return `infer ${this.from(node.typeParameter)}`;
				case "TSInstantiationExpression":
					break;
				case "TSInterfaceBody":
					return `{\n\t${node.body.map((property: Deno.lint.TSCallSignatureDeclaration | Deno.lint.TSConstructSignatureDeclaration | Deno.lint.TSIndexSignature | Deno.lint.TSMethodSignature | Deno.lint.TSPropertySignature): string => {
						return this.from(property);
					}).sort().join("\n\t")}\n}`;
				case "TSInterfaceDeclaration":
					return `interface ${this.from(node.id)}${(typeof node.typeParameters === "undefined") ? "" : this.from(node.typeParameters)}${(node.extends.length > 0) ? `extends ${node.extends.map((extend: Deno.lint.TSInterfaceHeritage): string => {
						return this.from(extend);
					}).sort().join(", ")}` : ""} ${this.from(node.body)}`;
				case "TSInterfaceHeritage":
					return `${this.from(node.expression)}${(typeof node.typeArguments === "undefined") ? "" : this.from(node.typeArguments)}`;
				case "TSIntersectionType":
					return `(${node.types.map((type: Deno.lint.TypeNode): string => {
						return this.from(type);
					}).sort().join(" & ")})`;
				case "TSIntrinsicKeyword":
					return "intrinsic";
				case "TSLiteralType":
					return this.from(node.literal);
				case "TSMappedType":
					break;
				case "TSMethodSignature":
					break;
				case "TSModuleBlock":
					return `{\n\t${node.body.map((statement: Deno.lint.Statement): string => {
						return this.from(statement);
					}).sort().join("\n\t")}\n}`;
				case "TSModuleDeclaration":
					return `${node.declare ? "declare " : ""}${node.kind} ${this.from(node.id)}${(typeof node.body === "undefined") ? "" : ` ${this.from(node.body)}`}`;
				case "TSNamedTupleMember":
					return `${this.from(node.label)}${node.optional ? "?" : ""}: ${this.from(node.elementType)}`;
				case "TSNamespaceExportDeclaration":
					break;
				case "TSNeverKeyword":
					return "never";
				case "TSNonNullExpression":
					return `${this.from(node.expression)}!`;
				case "TSNullKeyword":
					return "null";
				case "TSNumberKeyword":
					return "number";
				case "TSObjectKeyword":
					return "object";
				case "TSOptionalType":
					break;
				case "TSPropertySignature":
					return `${node.static ? "static " : ""}${node.readonly ? "readonly " : ""}${node.computed ? `[${this.from(node.key)}]` : this.from(node.key)}${node.optional ? "?" : ""}${(typeof node.typeAnnotation === "undefined") ? "" : this.from(node.typeAnnotation)}`;
				case "TSQualifiedName":
					return `${this.from(node.left)}.${this.from(node.right)}`;
				case "TSRestType":
					return `...${this.from(node.typeAnnotation)}`;
				case "TSSatisfiesExpression":
					break;
				case "TSStringKeyword":
					return "string";
				case "TSSymbolKeyword":
					return "symbol";
				case "TSTemplateLiteralType": {
					if (node.quasis.length - 1 !== node.types.length) {
						break;
					}
					let result: string = "";
					for (let index: number = 0; index < node.quasis.length; index += 1) {
						const quasi: Deno.lint.TemplateElement = node.quasis[index];
						result += this.from(quasi);
						if (quasi.tail) {
							break;
						}
						result += `\${${this.from(node.types[index])}}`;
					}
					return `\`${result}\``;
				}
				case "TSThisType":
					return "this";
				case "TSTupleType":
					return `[${node.elementTypes.map((element: Deno.lint.TypeNode): string => {
						return this.from(element);
					}).join(", ")}]`;
				case "TSTypeAliasDeclaration":
					break;
				case "TSTypeAnnotation":
					return `: ${this.from(node.typeAnnotation)}`;
				case "TSTypeAssertion":
					break;
				case "TSTypeLiteral":
					return `{\n\t${node.members.map((member: Deno.lint.TSCallSignatureDeclaration | Deno.lint.TSConstructSignatureDeclaration | Deno.lint.TSIndexSignature | Deno.lint.TSMethodSignature | Deno.lint.TSPropertySignature): string => {
						return this.from(member);
					}).sort().join(";\n\t")}\n}`;
				case "TSTypeOperator":
					return `${node.operator} ${this.from(node.typeAnnotation)}`;
				case "TSTypeParameter":
					break;
				case "TSTypeParameterDeclaration":
					return `<${node.params.map((param: Deno.lint.TSTypeParameter): string => {
						return this.from(param);
					}).join(", ")}>`;
				case "TSTypeParameterInstantiation":
					return `<${node.params.map((param: Deno.lint.TypeNode): string => {
						return this.from(param);
					}).join(", ")}>`;
				case "TSTypePredicate":
					break;
				case "TSTypeQuery":
					break;
				case "TSTypeReference":
					return `${this.from(node.typeName)}${(typeof node.typeArguments === "undefined") ? "" : this.from(node.typeArguments)}`;
				case "TSUndefinedKeyword":
					return "undefined";
				case "TSUnionType":
					return `(${node.types.map((type: Deno.lint.TypeNode): string => {
						return this.from(type);
					}).sort().join(" | ")})`;
				case "TSUnknownKeyword":
					return "unknown";
				case "TSVoidKeyword":
					return "void";
				case "UnaryExpression":
					return `${node.operator} ${this.from(node.argument)}`;
				case "UpdateExpression":
					return (node.prefix ? `${node.operator}${this.from(node.argument)}` : `${this.from(node.argument)}${node.operator}`);
				case "VariableDeclaration":
					return `${node.kind} ${node.declarations.map((declaration: Deno.lint.VariableDeclarator): string => {
						return this.from(declaration);
					}).sort().join(", ")}`;
				case "VariableDeclarator":
					return `${this.from(node.id)}${(node.init === null) ? "" : ` = ${this.from(node.init)}`}`;
				case "WhileStatement":
					return `while (${this.from(node.test)}) ${this.#forceBlock(node.body)}`;
				case "WithStatement":
					return `with (${this.from(node.object)}) ${this.#forceBlock(node.body)}`;
				case "YieldExpression":
					return `yield${node.delegate ? "*" : ""}${(node.argument === null) ? "" : ` ${this.from(node.argument)}`}`;
			}
		}
		//deno-lint-ignore no-empty -- Continue on error (e.g.: stack overflow).
		catch { }
		return `\${${node.type} ${crypto.randomUUID().replaceAll("-", "").toUpperCase()}}$`;
	}
}
const nodeSerializer = new NodeSerialize();
export function serializeNode(node: Deno.lint.Node): string {
	return nodeSerializer.from(node);
}
export function serializeInterfaceContext(node: Deno.lint.TSInterfaceDeclaration): string {
	return [...node.extends.map((extend: Deno.lint.TSInterfaceHeritage): string => {
		return serializeNode(extend);
	}), serializeNode(node.body)].join(" & ");
}
export function serializeSource(source: Deno.lint.StringLiteral, attributes: readonly Deno.lint.ImportAttribute[]): string {
	return `${source.value}::{${attributes.map((attribute: Deno.lint.ImportAttribute): string => {
		return serializeNode(attribute);
	}).sort().join(", ")}}`;
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
