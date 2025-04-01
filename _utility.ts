import { dirname as getPathDirname } from "jsr:@std/path@^1.0.8/dirname";
import { relative as getPathRelative } from "jsr:@std/path@^1.0.8/relative";
//#region Ancestor
export function getAncestorsReverse(context: Deno.lint.RuleContext, node: Deno.lint.Node): Deno.lint.Node[] {
	return context.sourceCode.getAncestors(node).reverse();
}
export function getClosestAncestor(context: Deno.lint.RuleContext, node: Deno.lint.Node): Deno.lint.Node {
	return getAncestorsReverse(context, node)[0];
}
//#endregion
//#region Node
export function getMemberRootIdentifier(node: Deno.lint.Node): Deno.lint.Identifier | null {
	switch (node.type) {
		case "CallExpression":
			return getMemberRootIdentifier(node.callee);
		case "Identifier":
			return node;
		case "MemberExpression":
			return getMemberRootIdentifier(node.object);
		case "TSIndexedAccessType":
			return getMemberRootIdentifier(node.objectType);
		case "TSTypeReference":
			return getMemberRootIdentifier(node.typeName);
		case "TSQualifiedName":
			return getMemberRootIdentifier(node.left);
	}
	return null;
}
export function isMatchMemberExpressionPattern(node: Deno.lint.MemberExpression, pattern: readonly string[]): boolean {
	for (let index: number = pattern.length - 1, nodeShadow: Deno.lint.Node = node as Deno.lint.Node; index >= 0; index -= 1) {
		const part: string = pattern[index];
		if (nodeShadow.type === "Identifier") {
			return (index === 0 && nodeShadow.name === part);
		}
		if (nodeShadow.type === "MemberExpression") {
			if (index > 0 && (
				(nodeShadow.property.type === "Identifier" && nodeShadow.property.name === part) ||
				(nodeShadow.property.type === "Literal" && nodeShadow.property.value === part)
			)) {
				nodeShadow = nodeShadow.object;
				continue;
			}
		}
		break;
	}
	return false;
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
		const {
			typescript = true
		} = options;
		this.#typescript = typescript;
	}
	#forceBlock(node: Deno.lint.Node): string {
		return ((node.type === "BlockStatement") ? this.from(node) : `{\n\t${this.from(node)}\n}`);
	}
	from(node: Deno.lint.Node): string {
		//deno-lint-ignore hugoalh/no-useless-try
		try {
			switch (node.type) {
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
				case "BinaryExpression":
				case "LogicalExpression":
					return `${this.from(node.left)} ${node.operator} ${this.from(node.right)}`;
				case "AssignmentPattern":
					return `${this.from(node.left)} = ${this.from(node.right)}`;
				case "AwaitExpression":
					return `await ${this.from(node.argument)}`;
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
					break;
				case "ChainExpression":
					break;
				case "ClassBody":
					break;
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
					break;
				case "DoWhileStatement":
					return `do ${this.#forceBlock(node.body)} while (${this.from(node.test)})`;
				case "ExportAllDeclaration":
					break;
				case "ExportDefaultDeclaration":
					return `export default ${this.from(node.declaration)}`;
				case "ExportNamedDeclaration":
					break;
				case "ExportSpecifier":
					break;
				case "ExpressionStatement":
					break;
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
						isBigIntLiteral(node) ||
						isBooleanLiteral(node) ||
						isNumberLiteral(node)
					) {
						return String(node.value);
					}
					if (
						isNullLiteral(node) ||
						isRegExpLiteral(node)
					) {
						return node.raw;
					}
					if (isStringLiteral(node)) {
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
					}).join("\n\t")}\n}`;
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
					break;
				case "TaggedTemplateExpression":
					break;
				case "TemplateElement":
					break;
				case "TemplateLiteral":
					break;
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
					break;
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
					return `${this.from(node.checkType)} extends ${this.from(node.extendsType)} ? ${(
						node.trueType.type === "TSFunctionType" ||
						node.trueType.type === "TSIntersectionType" ||
						node.trueType.type === "TSUnionType"
					) ? `(${resultTrue})` : resultTrue} : ${(
						node.falseType.type === "TSFunctionType" ||
						node.falseType.type === "TSIntersectionType" ||
						node.falseType.type === "TSUnionType"
					) ? `(${resultFalse})` : resultFalse}`;
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
					break;
				case "TSInstantiationExpression":
					break;
				case "TSInterfaceBody":
					return `{\n\t${node.body.map((property: Deno.lint.TSCallSignatureDeclaration | Deno.lint.TSConstructSignatureDeclaration | Deno.lint.TSIndexSignature | Deno.lint.TSMethodSignature | Deno.lint.TSPropertySignature): string => {
						return this.from(property);
					}).sort().join("\n\t")}\n}`;
				case "TSInterfaceDeclaration":
					return `interface ${this.from(node.id)}${(typeof node.typeParameters === "undefined") ? "" : this.from(node.typeParameters)}${(node.extends.length > 0) ? `extends ${node.extends.map((extend: Deno.lint.TSInterfaceHeritage): string => {
						return this.from(extend);
					}).join(", ")}` : ""} ${this.from(node.body)}`;
				case "TSInterfaceHeritage":
					return `${this.from(node.expression)}${(typeof node.typeArguments === "undefined") ? "" : this.from(node.typeArguments)}`;
				case "TSIntersectionType":
					return node.types.map((type: Deno.lint.TypeNode): string => {
						return `(${this.from(type)})`;
					}).sort().join(" & ");
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
					}).join("\n\t")}\n}`;
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
				case "TSTemplateLiteralType":
					break;
				case "TSThisType":
					return "this";
				case "TSTupleType":
					return `[${node.elementTypes.map((element: Deno.lint.TypeNode): string => {
						return this.from(element);
					}).join(",")}]`;
				case "TSTypeAliasDeclaration":
					break;
				case "TSTypeAnnotation":
					return `: ${this.from(node.typeAnnotation)}`;
				case "TSTypeAssertion":
					break;
				case "TSTypeLiteral":
					break;
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
					return node.types.map((type: Deno.lint.TypeNode): string => {
						return `(${this.from(type)})`;
					}).sort().join(" | ");
				case "TSUnknownKeyword":
					return "unknown";
				case "TSVoidKeyword":
					return "void";
				case "UnaryExpression":
					break;
				case "UpdateExpression":
					return (node.prefix ? `${node.operator}${this.from(node.argument)}` : `${this.from(node.argument)}${node.operator}`);
				case "VariableDeclaration":
					return `${node.kind} ${node.declarations.map((declaration: Deno.lint.VariableDeclarator): string => {
						return this.from(declaration);
					}).join(", ")}`;
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
		return `$$${node.type} ${crypto.randomUUID().replaceAll("-", "").toUpperCase()}$$`;
	}
}
const nodeSerializer = new NodeSerialize();
export function serializeNode(node: Deno.lint.Node): string {
	return nodeSerializer.from(node);
}
//#endregion
//#region Node Literal
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
//#region Position
export interface ContextPosition {
	columnBegin: number;
	columnEnd: number;
	lineBegin: number;
	lineEnd: number;
}
export function getContextPositionInternal(raw: string, indexBegin: number, indexEnd: number): ContextPosition {
	const rawBegin: string = raw.slice(0, indexBegin);
	const rawBeginSplit: readonly string[] = rawBegin.split("\n");
	const lineBegin: number = rawBeginSplit.length;
	const columnBegin: number = rawBegin.replace(rawBeginSplit.slice(0, lineBegin - 1).join("\n"), "").length;
	const rawEnd: string = raw.slice(0, indexEnd);
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
	return getContextPositionInternal(context.sourceCode.text, rawIndexBegin, rawIndexEnd);
}
//#endregion
//#region Text
export function getContextTextFromNodes(context: Deno.lint.RuleContext, nodes: readonly Deno.lint.Node[]): string {
	if (nodes.length === 0) {
		throw new Error(`Parameter \`nodes\` is empty!`);
	}
	return context.sourceCode.text.slice(nodes[0].range[0], nodes[nodes.length - 1].range[1]);
}
//#endregion
