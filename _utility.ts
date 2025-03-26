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
export interface StandardizeNodeOptions {
	react?: boolean;
	typescript?: boolean;
}
export function standardizeNode(node: Deno.lint.Node, options: StandardizeNodeOptions = {}): string {
	const {
		typescript = true
	} = options;
	//deno-lint-ignore hugoalh/no-useless-try
	try {
		switch (node.type) {
			case "ArrayExpression":
				return `[${node.elements.map((element: Deno.lint.Expression | Deno.lint.SpreadElement): string => {
					return standardizeNode(element, options);
				}).join(", ")}]`;
			case "ArrayPattern":
				break;
			case "ArrowFunctionExpression":
				break;
			case "AssignmentExpression":
			case "BinaryExpression":
			case "LogicalExpression":
				return `${standardizeNode(node.left, options)} ${node.operator} ${standardizeNode(node.right, options)}`;
			case "AssignmentPattern":
				return `${standardizeNode(node.left, options)} = ${standardizeNode(node.right, options)}`;
			case "AwaitExpression":
				return `await ${standardizeNode(node.argument, options)}`;
			case "BlockStatement":
				return `{\n\t${node.body.map((statement: Deno.lint.Statement): string => {
					return standardizeNode(statement, options);
				}).join("\n\t")}\n}`;
			case "BreakStatement":
				return `break${(node.label === null) ? "" : ` ${standardizeNode(node.label, options)}`}`;
			case "CallExpression":
				return `${standardizeNode(node.callee, options)}${node.optional ? "?." : ""}${(typescript && node.typeArguments !== null) ? standardizeNode(node.typeArguments, options) : ""}(${node.arguments.map((argument: Deno.lint.Expression | Deno.lint.SpreadElement): string => {
					return standardizeNode(argument, options);
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
				break;
			case "ContinueStatement":
				return `continue${(node.label === null) ? "" : ` ${standardizeNode(node.label, options)}`}`;
			case "DebuggerStatement":
				return `debugger`;
			case "Decorator":
				break;
			case "DoWhileStatement":
				return `do ${(node.body.type === "BlockStatement") ? standardizeNode(node.body, options) : `{\n\t${standardizeNode(node.body, options)}\n}`} while (${standardizeNode(node.test, options)})`;
			case "ExportAllDeclaration":
				break;
			case "ExportDefaultDeclaration":
				return `export default ${standardizeNode(node.declaration, options)}`;
			case "ExportNamedDeclaration":
				break;
			case "ExportSpecifier":
				break;
			case "ExpressionStatement":
				break;
			case "ForInStatement":
				break;
			case "ForOfStatement":
				break;
			case "ForStatement":
				break;
			case "FunctionDeclaration":
				break;
			case "FunctionExpression":
				break;
			case "Identifier":
				return `${node.name}${node.optional ? "?" : ""}${(typescript && typeof node.typeAnnotation !== "undefined") ? standardizeNode(node.typeAnnotation, options) : ""}`;
			case "IfStatement":
				return `if (${standardizeNode(node.test, options)}) ${(node.consequent.type === "BlockStatement") ? standardizeNode(node.consequent, options) : `{\n\t${standardizeNode(node.consequent, options)}\n}`}${(node.alternate === null) ? "" : `else ${(
					node.alternate.type === "BlockStatement" ||
					node.alternate.type === "IfStatement"
				) ? standardizeNode(node.alternate, options) : `{\n\t${standardizeNode(node.alternate, options)}\n}`}`}`;
			case "ImportAttribute":
				return `${standardizeNode(node.key, options)}: ${standardizeNode(node.value, options)}`;
			case "ImportDeclaration":
				break;
			case "ImportDefaultSpecifier":
				return standardizeNode(node.local, options);
			case "ImportExpression":
				return `import(${standardizeNode(node.source)}${(node.options === null) ? "" : `, ${standardizeNode(node.options)}`})`;
			case "ImportNamespaceSpecifier":
				return `* as ${standardizeNode(node.local, options)}`;
			case "ImportSpecifier":
				break;
			case "JSXAttribute":
				break;
			case "JSXClosingElement":
				break;
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
				break;
			case "JSXMemberExpression":
				break;
			case "JSXNamespacedName":
				break;
			case "JSXOpeningElement":
				break;
			case "JSXOpeningFragment":
				break;
			case "JSXSpreadAttribute":
				break;
			case "JSXText":
				break;
			case "LabeledStatement":
				return `${standardizeNode(node.label, options)}: ${standardizeNode(node.body, options)}`;
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
				return `${standardizeNode(node.object, options)}${node.optional ? "?" : ""}.${standardizeNode(node.property, options)}`;
			case "MetaProperty":
				break;
			case "MethodDefinition":
				break;
			case "NewExpression":
				break;
			case "ObjectExpression":
				break;
			case "ObjectPattern":
				break;
			case "PrivateIdentifier":
				break;
			case "Program":
				return node.body.map((statement: Deno.lint.Statement): string => {
					return standardizeNode(statement, options);
				}).join("\n");
			case "Property":
				break;
			case "PropertyDefinition":
				break;
			case "RestElement":
				break;
			case "ReturnStatement":
				return `return${(node.argument === null) ? "" : ` ${standardizeNode(node.argument, options)}`}`;
			case "SequenceExpression":
				break;
			case "SpreadElement":
				break;
			case "StaticBlock":
				return `static {\n\t${node.body.map((statement: Deno.lint.Statement): string => {
					return standardizeNode(statement, options);
				}).join("\n\t")}\n}`;
			case "Super":
				return "super";
			case "SwitchCase":
				return `${(node.test === null) ? "default" : `case ${node.test}`}: ${node.consequent.map((statement: Deno.lint.Statement): string => {
					return standardizeNode(statement, options);
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
				return `throw ${standardizeNode(node.argument, options)}`;
			case "TryStatement":
				break;
			case "TSAbstractMethodDefinition":
				break;
			case "TSAbstractPropertyDefinition":
				break;
			case "TSAnyKeyword":
				return "any";
			case "TSArrayType": {
				const result: string = standardizeNode(node.elementType, options);
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
				const resultFalse: string = standardizeNode(node.falseType, options);
				const resultTrue: string = standardizeNode(node.trueType, options);
				return `${standardizeNode(node.checkType, options)} extends ${standardizeNode(node.extendsType, options)} ? ${(
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
					return standardizeNode(member, options);
				}).sort().join(",\n\t")}\n}`;
			case "TSEnumDeclaration":
				return `${node.declare ? "declare " : ""}${node.const ? "const " : ""}enum ${standardizeNode(node.id, options)} ${standardizeNode(node.body, options)}`;
			case "TSEnumMember":
				return `${standardizeNode(node.id, options)}${(typeof node.initializer === "undefined") ? "" : ` = ${standardizeNode(node.initializer, options)}`}`;
			case "TSExportAssignment":
				return `export = ${standardizeNode(node.expression, options)}`;
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
					return standardizeNode(property, options);
				}).sort().join("\n\t")}\n}`;
			case "TSInterfaceDeclaration":
				return `interface ${standardizeNode(node.id)}${(typeof node.typeParameters === "undefined") ? "" : standardizeNode(node.typeParameters)}${(node.extends.length > 0) ? `extends ${node.extends.map((extend: Deno.lint.TSInterfaceHeritage): string => {
					return standardizeNode(extend, options);
				}).join(", ")}` : ""} ${standardizeNode(node.body, options)}`;
			case "TSInterfaceHeritage":
				return `${standardizeNode(node.expression, options)}${(typeof node.typeArguments === "undefined") ? "" : standardizeNode(node.typeArguments, options)}`;
			case "TSIntersectionType":
				return node.types.map((type: Deno.lint.TypeNode): string => {
					return `(${standardizeNode(type, options)})`;
				}).sort().join(" & ");
			case "TSIntrinsicKeyword":
				return "intrinsic";
			case "TSLiteralType":
				break;
			case "TSMappedType":
				break;
			case "TSMethodSignature":
				break;
			case "TSModuleBlock":
				break;
			case "TSModuleDeclaration":
				break;
			case "TSNamedTupleMember":
				return `${standardizeNode(node.label, options)}${node.optional ? "?" : ""}: ${standardizeNode(node.elementType, options)}`;
			case "TSNamespaceExportDeclaration":
				break;
			case "TSNeverKeyword":
				return "never";
			case "TSNonNullExpression":
				break;
			case "TSNullKeyword":
				return "null";
			case "TSNumberKeyword":
				return "number";
			case "TSObjectKeyword":
				return "object";
			case "TSOptionalType":
				break;
			case "TSPropertySignature":
				break;
			case "TSQualifiedName":
				return `${standardizeNode(node.left, options)}.${standardizeNode(node.right, options)}`;
			case "TSRestType":
				return `...${standardizeNode(node.typeAnnotation, options)}`;
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
					return standardizeNode(element, options);
				}).join(",")}]`;
			case "TSTypeAliasDeclaration":
				break;
			case "TSTypeAnnotation":
				return `: ${standardizeNode(node.typeAnnotation, options)}`;
			case "TSTypeAssertion":
				break;
			case "TSTypeLiteral":
				break;
			case "TSTypeOperator":
				return `${node.operator} ${standardizeNode(node.typeAnnotation, options)}`;
			case "TSTypeParameter":
				break;
			case "TSTypeParameterDeclaration":
				return `<${node.params.map((param: Deno.lint.TSTypeParameter): string => {
					return standardizeNode(param, options);
				}).join(", ")}>`;
			case "TSTypeParameterInstantiation":
				return `<${node.params.map((param: Deno.lint.TypeNode): string => {
					return standardizeNode(param, options);
				}).join(", ")}>`;
			case "TSTypePredicate":
				break;
			case "TSTypeQuery":
				break;
			case "TSTypeReference":
				return `${standardizeNode(node.typeName, options)}${(typeof node.typeArguments === "undefined") ? "" : standardizeNode(node.typeArguments, options)}`;
			case "TSUndefinedKeyword":
				return "undefined";
			case "TSUnionType":
				return node.types.map((type: Deno.lint.TypeNode): string => {
					return `(${standardizeNode(type, options)})`;
				}).sort().join(" | ");
			case "TSUnknownKeyword":
				return "unknown";
			case "TSVoidKeyword":
				return "void";
			case "UnaryExpression":
				break;
			case "UpdateExpression":
				return (node.prefix ? `${node.operator}${standardizeNode(node.argument, options)}` : `${standardizeNode(node.argument, options)}${node.operator}`);
			case "VariableDeclaration":
				return `${node.kind} ${node.declarations.map((declaration: Deno.lint.VariableDeclarator): string => {
					return standardizeNode(declaration, options);
				}).join(", ")}`;
			case "VariableDeclarator":
				return `${standardizeNode(node.id, options)}${(node.init === null) ? "" : ` = ${standardizeNode(node.init, options)}`}`;
			case "WhileStatement":
				return `while (${standardizeNode(node.test, options)}) ${(node.body.type === "BlockStatement") ? standardizeNode(node.body, options) : `{\n\t${standardizeNode(node.body, options)}\n}`}`;
			case "WithStatement":
				return `with (${standardizeNode(node.object, options)}) ${(node.body.type === "BlockStatement") ? standardizeNode(node.body, options) : `{\n\t${standardizeNode(node.body, options)}\n}`}`;
			case "YieldExpression":
				return `yield${node.delegate ? "*" : ""}${(node.argument === null) ? "" : ` ${standardizeNode(node.argument, options)}`}`;
		}
	}
	//deno-lint-ignore no-empty -- Continue on error (e.g.: stack overflow).
	catch { }
	return `$$${node.type} ${crypto.randomUUID().replaceAll("-", "").toUpperCase()}$$`;
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
export function getContextPositionRaw(raw: string, indexBegin: number, indexEnd: number): ContextPosition {
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
	return getContextPositionRaw(context.sourceCode.text, rawIndexBegin, rawIndexEnd);
}
//#endregion
