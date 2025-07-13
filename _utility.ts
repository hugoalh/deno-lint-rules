import {
	dirname as getPathDirname,
	relative as getPathRelative
} from "node:path";
export type RuleSet =
	| "all"
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
//#region Literal
export interface NumericLiteralDissect {
	// NOTE: Sign of the numeric is exist in the unary expression.
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
export function dissectNumericLiteral(node: Deno.lint.BigIntLiteral | Deno.lint.NumberLiteral): NumericLiteralDissect {
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
export function isNodeRegExpLiteral(node: Deno.lint.Node): node is Deno.lint.RegExpLiteral {
	return (node.type === "Literal" && node.value instanceof RegExp);
}
export function isNodeStringLiteral(node: Deno.lint.Node): node is Deno.lint.StringLiteral {
	return (node.type === "Literal" && typeof node.value === "string");
}
//#endregion
//#region Node
export function areNodesSame(a: Deno.lint.Node, b: Deno.lint.Node): boolean {
	return (a.type === b.type && a.range[0] === b.range[0] && a.range[1] === b.range[1]);
}
export function getCommentsFromRange(context: Deno.lint.RuleContext, range: Deno.lint.Range): (Deno.lint.BlockComment | Deno.lint.LineComment)[] {
	const [
		rangeBegin,
		rangeEnd
	]: Deno.lint.Range = range;
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
export function getPropertyKeyString(node: Deno.lint.Identifier | Deno.lint.Literal): string {
	if (node.type === "Identifier") {
		return node.name;
	}
	return String(node.value);
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
const globalNames: readonly string[] = [
	"globalThis",
	"self",
	"window"
];
export class MemberExpressionMatcher {
	#allowFromGlobals: boolean;
	#pattern: readonly string[];
	constructor(pattern: readonly string[], allowFromGlobals: boolean = false) {
		this.#allowFromGlobals = allowFromGlobals;
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
				if (target.property.type === "Literal" && isNodeStringLiteral(target.property)) {
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
			(!this.#allowFromGlobals && indexOfPatternBegin !== 0)
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
		case "ConditionalExpression":
			return (isNodeNoOperation(node.test) && isNodeNoOperation(node.consequent) && isNodeNoOperation(node.alternate));
		case "TemplateLiteral":
			return node.expressions.every((expression: Deno.lint.Expression): boolean => {
				return isNodeNoOperation(expression);
			});
	}
	return false;
}
export function isNodeJSDoc(node: Deno.lint.Node): boolean {
	return (node.type === "Block" && node.value.startsWith("*"));
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
//#endregion
//#region Node Serialize
export interface NodeSerializerOptions {
	typescript?: boolean;
}
export class NodeSerializer {
	get [Symbol.toStringTag](): string {
		return "NodeSerialize";
	}
	#typescript: boolean;
	constructor(options: NodeSerializerOptions = {}) {
		const { typescript = true } = options;
		this.#typescript = typescript;
	}
	#forceBlock(node: Deno.lint.Node): string {
		return ((node.type === "BlockStatement") ? this.for(node) : `{\n\t${this.for(node)}\n}`);
	}
	for(node: Deno.lint.Node | Deno.lint.AccessorProperty): string {
		//deno-lint-ignore hugoalh/no-useless-try
		try {
			switch (node.type) {
				case "AccessorProperty":
					break;
				case "ArrayExpression":
					return `[${node.elements.map((element: Deno.lint.Expression | Deno.lint.SpreadElement): string => {
						return this.for(element);
					}).join(", ")}]`;
				case "ArrayPattern":
					return `[${node.elements.map((element: Deno.lint.ArrayPattern | Deno.lint.Identifier | Deno.lint.MemberExpression | Deno.lint.ObjectPattern | Deno.lint.AssignmentPattern | Deno.lint.RestElement | null): string => {
						return ((element === null) ? "" : this.for(element));
					}).join(", ")}]${(this.#typescript && node.optional) ? "?" : ""}${(this.#typescript && typeof node.typeAnnotation !== "undefined") ? this.for(node.typeAnnotation) : ""}`;
				case "ArrowFunctionExpression":
					break;
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
					return `{\n\t${node.body.map((statement: Deno.lint.Statement): string => {
						return this.for(statement);
					}).join("\n\t")}\n}`;
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
					return `{\n\t${node.body.map((statement: Deno.lint.AccessorProperty | Deno.lint.MethodDefinition | Deno.lint.PropertyDefinition | Deno.lint.StaticBlock | Deno.lint.TSAbstractMethodDefinition | Deno.lint.TSAbstractPropertyDefinition | Deno.lint.TSIndexSignature): string => {
						return this.for(statement);
					}).sort().join("\n\t")}\n}`;
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
					return `do ${this.#forceBlock(node.body)} while (${this.for(node.test)})`;
				case "ExportAllDeclaration":
					return `export${(node.exportKind === "type") ? " type" : ""} * as ${this.for(node.exported!)} from ${this.for(node.source)} with {\n\t${node.attributes.map((attribute: Deno.lint.ImportAttribute): string => {
						return this.for(attribute);
					}).sort().join(",\n\t")}\n}`;
				case "ExportDefaultDeclaration":
					return `export default ${this.for(node.declaration)}`;
				case "ExportNamedDeclaration":
					break;
				case "ExportSpecifier":
					return `${(node.exportKind === "type") ? "type " : ""}${this.for(node.local)} as ${this.for(node.exported)}`;
				case "ExpressionStatement":
					return this.for(node.expression);
				case "ForInStatement":
					return `for (${this.for(node.left)} in ${this.for(node.right)}) ${this.for(node.body)}`;
				case "ForOfStatement":
					return `for ${node.await ? "await " : ""}(${this.for(node.left)} of ${this.for(node.right)}) ${this.for(node.body)}`;
				case "ForStatement":
					return `for (${(node.init === null) ? "" : this.for(node.init)}; ${(node.test === null) ? "" : this.for(node.test)}; ${(node.update === null) ? "" : this.for(node.update)}) ${this.#forceBlock(node.body)}`;
				case "FunctionDeclaration":
					break;
				case "FunctionExpression":
					break;
				case "Identifier":
					return `${node.name}${node.optional ? "?" : ""}${(this.#typescript && typeof node.typeAnnotation !== "undefined") ? this.for(node.typeAnnotation) : ""}`;
				case "IfStatement":
					return `if (${this.for(node.test)}) ${this.#forceBlock(node.consequent)}${(node.alternate === null) ? "" : `else ${(
						node.alternate.type === "BlockStatement" ||
						node.alternate.type === "IfStatement"
					) ? this.for(node.alternate) : `{\n\t${this.for(node.alternate)}\n}`}`}`;
				case "ImportAttribute":
					return `${this.for(node.key)}: ${this.for(node.value)}`;
				case "ImportDeclaration":
					break;
				case "ImportDefaultSpecifier":
					return this.for(node.local);
				case "ImportExpression":
					return `import(${this.for(node.source)}${(node.options === null) ? "" : `, ${this.for(node.options)}`})`;
				case "ImportNamespaceSpecifier":
					return `* as ${this.for(node.local)}`;
				case "ImportSpecifier":
					return `${(node.importKind === "type") ? "type " : ""}${this.for(node.imported)} as ${this.for(node.local)}`;
				case "JSXAttribute":
					return `${this.for(node.name)}${(node.value === null) ? "" : ` = ${this.for(node.value)}`}`;
				case "JSXClosingElement":
					return `</${this.for(node.name)}>`;
				case "JSXClosingFragment":
					return "</>";
				case "JSXElement":
					return `${this.for(node.openingElement)}${node.children.map((child: Deno.lint.JSXChild): string => {
						return this.for(child);
					}).join("")}${(node.closingElement === null) ? `</${node.openingElement.name}>` : this.for(node.closingElement)}`;
				case "JSXEmptyExpression":
					return "";
				case "JSXExpressionContainer":
					return `{${this.for(node.expression)}}`;
				case "JSXFragment":
					return `${this.for(node.openingFragment)}${node.children.map((child: Deno.lint.JSXChild): string => {
						return this.for(child);
					}).join("")}${this.for(node.closingFragment)}`;
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
						return `"${node.value}"`;
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
					return `{\n\t${node.properties.map((property: Deno.lint.SpreadElement | Deno.lint.Property): string => {
						return this.for(property);
					}).sort().join("\n\t")}\n}`;
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
					return `static {\n\t${node.body.map((statement: Deno.lint.Statement): string => {
						return this.for(statement);
					}).join("\n\t")}\n}`;
				case "Super":
					return "super";
				case "SwitchCase":
					return `${(node.test === null) ? "default" : `case ${node.test}`}: ${node.consequent.map((statement: Deno.lint.Statement): string => {
						return this.for(statement);
					}).join("\n")}`;
				case "SwitchStatement":
					return `switch (${this.for(node.discriminant)}) {\n\t${node.cases.map((switchCase: Deno.lint.SwitchCase): string => {
						return this.for(switchCase);
					})}\n}`;
				case "TaggedTemplateExpression":
					return `${this.for(node.tag)}${(this.#typescript && typeof node.typeArguments !== "undefined") ? this.for(node.typeArguments) : ""}${this.for(node.quasi)}`;
				case "TemplateElement":
					return node.cooked;
				case "TemplateLiteral": {
					if (node.quasis.length - 1 !== node.expressions.length) {
						break;
					}
					let result: string = "";
					for (let index: number = 0; index < node.quasis.length; index += 1) {
						const quasi: Deno.lint.TemplateElement = node.quasis[index];
						result += this.for(quasi);
						if (quasi.tail) {
							break;
						}
						result += `\${${this.for(node.expressions[index])}}`;
					}
					return `\`${result}\``;
				}
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
					return `{\n\t${node.members.map((member: Deno.lint.TSEnumMember): string => {
						return this.for(member);
					}).sort().join(",\n\t")}\n}`;
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
					return `{\n\t${node.body.map((property: Deno.lint.TSCallSignatureDeclaration | Deno.lint.TSConstructSignatureDeclaration | Deno.lint.TSIndexSignature | Deno.lint.TSMethodSignature | Deno.lint.TSPropertySignature): string => {
						return this.for(property);
					}).sort().join("\n\t")}\n}`;
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
					return `{\n\t${node.body.map((statement: Deno.lint.Statement): string => {
						return this.for(statement);
					}).sort().join("\n\t")}\n}`;
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
				case "TSTemplateLiteralType": {
					if (node.quasis.length - 1 !== node.types.length) {
						break;
					}
					let result: string = "";
					for (let index: number = 0; index < node.quasis.length; index += 1) {
						const quasi: Deno.lint.TemplateElement = node.quasis[index];
						result += this.for(quasi);
						if (quasi.tail) {
							break;
						}
						result += `\${${this.for(node.types[index])}}`;
					}
					return `\`${result}\``;
				}
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
					return `{\n\t${node.members.map((member: Deno.lint.TSCallSignatureDeclaration | Deno.lint.TSConstructSignatureDeclaration | Deno.lint.TSIndexSignature | Deno.lint.TSMethodSignature | Deno.lint.TSPropertySignature): string => {
						return this.for(member);
					}).sort().join(";\n\t")}\n}`;
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
					return `while (${this.for(node.test)}) ${this.#forceBlock(node.body)}`;
				case "WithStatement":
					return `with (${this.for(node.object)}) ${this.#forceBlock(node.body)}`;
				case "YieldExpression":
					return `yield${node.delegate ? "*" : ""}${(node.argument === null) ? "" : ` ${this.for(node.argument)}`}`;
			}
		}
		//deno-lint-ignore no-empty -- Continue on error (e.g.: stack overflow).
		catch { }
		return `\${${node.type} ${crypto.randomUUID().replaceAll("-", "").toUpperCase()}}$`;
	}
	forInterfaceContext(node: Deno.lint.TSInterfaceDeclaration): string {
		return [...node.extends.map((extend: Deno.lint.TSInterfaceHeritage): string => {
			return this.for(extend);
		}), this.for(node.body)].join(" & ");
	}
	forSource(source: Deno.lint.StringLiteral, attributes: readonly Deno.lint.ImportAttribute[]): string {
		return `${source.value}::{${attributes.map((attribute: Deno.lint.ImportAttribute): string => {
			return this.for(attribute);
		}).sort().join(", ")}}`;
	}
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
//#region Raw
export function getRawFromNodes(context: Deno.lint.RuleContext, nodes: readonly Deno.lint.Node[]): string {
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
//#region Visual Position
export type VisualPositionArray = [
	lineBegin: number,
	columnBegin: number,
	lineEnd: number,
	columnEnd: number
];
export interface VisualPositionObject {
	columnBegin: number;
	columnEnd: number;
	lineBegin: number;
	lineEnd: number;
}
export function getVisualPosition(raw: string, range: Deno.lint.Range): VisualPositionObject {
	const slicesBegin: readonly string[] = raw.slice(0, range[0]).split("\n");
	const lineBegin: number = slicesBegin.length;
	const columnBegin: number = slicesBegin[lineBegin - 1].length + 1;
	const slicesEnd: readonly string[] = raw.slice(0, range[1]).split("\n");
	const lineEnd: number = slicesEnd.length;
	const columnEnd: number = slicesEnd[lineEnd - 1].length + 1;
	return {
		columnBegin,
		columnEnd,
		lineBegin,
		lineEnd
	};
}
export function getVisualPositionForDiagnostics(raw: string, diagnostics: readonly Deno.lint.Diagnostic[]): readonly Readonly<VisualPositionArray>[] {
	return diagnostics.map((diagnostic: Deno.lint.Diagnostic): Readonly<VisualPositionArray> => {
		const {
			columnBegin,
			columnEnd,
			lineBegin,
			lineEnd
		}: VisualPositionObject = getVisualPosition(raw, diagnostic.range);
		return [
			lineBegin,
			columnBegin,
			lineEnd,
			columnEnd
		];
	});
}
export function getVisualPositionFromNode(context: Deno.lint.RuleContext, node: Deno.lint.Node): VisualPositionObject {
	return getVisualPosition(context.sourceCode.text, node.range);
}
export function getVisualPositionStringFromNode(context: Deno.lint.RuleContext, node: Deno.lint.Node): string {
	const {
		columnBegin,
		columnEnd,
		lineBegin,
		lineEnd
	}: VisualPositionObject = getVisualPositionFromNode(context, node);
	return `Line ${lineBegin} Column ${columnBegin} ~ Line ${lineEnd} Column ${columnEnd}`;
}
//#endregion
