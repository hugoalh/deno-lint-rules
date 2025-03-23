import { dirname as getPathDirname } from "jsr:@std/path@^1.0.8/dirname";
import { relative as getPathRelative } from "jsr:@std/path@^1.0.8/relative";
export function getAncestorsReverse(context: Deno.lint.RuleContext, node: Deno.lint.Node): Deno.lint.Node[] {
	return context.sourceCode.getAncestors(node).reverse();
}
export function getClosestAncestor(context: Deno.lint.RuleContext, node: Deno.lint.Node): Deno.lint.Node {
	return getAncestorsReverse(context, node)[0];
}
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
export function normalizeNode(node: Exclude<Deno.lint.Node, Deno.lint.Program>): string {
	//deno-lint-ignore hugoalh/no-useless-try
	try {
		switch (node.type) {
			case "ArrayExpression":
				return `[${node.elements.map((element: Deno.lint.Expression | Deno.lint.SpreadElement): string => {
					return normalizeNode(element);
				}).join(", ")}]`;
			case "ArrayPattern":
				break;
			case "ArrowFunctionExpression":
				break;
			case "AssignmentExpression":
				return `${normalizeNode(node.left)} ${node.operator} ${normalizeNode(node.right)}`;
			case "AssignmentPattern":
				return `${normalizeNode(node.left)} = ${normalizeNode(node.right)}`;
			case "AwaitExpression":
				return `await ${normalizeNode(node.argument)}`;
			case "BinaryExpression":
				return `${normalizeNode(node.left)} ${node.operator} ${normalizeNode(node.right)}`;
			case "BlockStatement":
				return `{\n${node.body.map((statement: Deno.lint.Statement): string => {
					return normalizeNode(statement);
				}).join("\n")}\n}`;
			case "BreakStatement":
				return `break${(node.label === null) ? "" : ` ${normalizeNode(node.label)}`}`;
			case "CallExpression":
				break;
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
				return `continue${(node.label === null) ? "" : ` ${normalizeNode(node.label)}`}`;
			case "DebuggerStatement":
				return `debugger`;
			case "Decorator":
				break;
			case "DoWhileStatement":
				return `do ${(node.body.type === "BlockStatement") ? normalizeNode(node.body) : `{${normalizeNode(node.body)}}`} while (${normalizeNode(node.test)})`;
			case "ExportAllDeclaration":
				break;
			case "ExportDefaultDeclaration":
				return `export default ${normalizeNode(node.declaration)}`;
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
				return `${node.name}${node.optional ? "?" : ""}${(typeof node.typeAnnotation === "undefined") ? "" : `: ${normalizeNode(node.typeAnnotation)}`}`;
			case "IfStatement":
				return `if (${normalizeNode(node.test)}) ${(node.consequent.type === "BlockStatement") ? normalizeNode(node.consequent) : `{${normalizeNode(node.consequent)}}`}${node.alternate === null ? "" : `else ${(
					node.alternate.type === "BlockStatement" ||
					node.alternate.type === "IfStatement"
				) ? normalizeNode(node.alternate) : `{${normalizeNode(node.alternate)}}`}`}`;
			case "ImportAttribute":
				break;
			case "ImportDeclaration":
				break;
			case "ImportDefaultSpecifier":
				break;
			case "ImportExpression":
				break;
			case "ImportNamespaceSpecifier":
				break;
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
				break;
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
			case "LogicalExpression":
				break;
			case "MemberExpression":
				break;
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
			case "Property":
				break;
			case "PropertyDefinition":
				break;
			case "RestElement":
				break;
			case "ReturnStatement":
				return `return${(node.argument === null) ? "" : ` ${normalizeNode(node.argument)}`}`;
			case "SequenceExpression":
				break;
			case "SpreadElement":
				break;
			case "StaticBlock":
				return `static {\n\t${node.body.map((statement: Deno.lint.Statement): string => {
					return normalizeNode(statement);
				}).join("\n\t")}\n}`;
			case "Super":
				return "super";
			case "SwitchCase":
				return `${(node.test === null) ? "default" : `case ${node.test}`}: ${node.consequent.map((statement: Deno.lint.Statement): string => {
					return normalizeNode(statement);
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
				return `throw ${normalizeNode(node.argument)}`;
			case "TryStatement":
				break;
			case "TSAbstractMethodDefinition":
				break;
			case "TSAbstractPropertyDefinition":
				break;
			case "TSAnyKeyword":
				return "any";
			case "TSArrayType": {
				const result: string = normalizeNode(node.elementType);
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
				const resultFalse: string = normalizeNode(node.falseType);
				const resultTrue: string = normalizeNode(node.trueType);
				return `${normalizeNode(node.checkType)} extends ${normalizeNode(node.extendsType)} ? ${(
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
				break;
			case "TSEnumDeclaration":
				break;
			case "TSEnumMember":
				return `${normalizeNode(node.id)}${(typeof node.initializer === "undefined") ? "" : ` = ${normalizeNode(node.initializer)}`}`;
			case "TSExportAssignment":
				break;
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
					return normalizeNode(property);
				}).sort().join("\n\t")}\n}`;
			case "TSInterfaceDeclaration":
				return `interface ${normalizeNode(node.id)}${(typeof node.typeParameters === "undefined") ? "" : normalizeNode(node.typeParameters)}${(node.extends.length > 0) ? `extends ${node.extends.map((extend: Deno.lint.TSInterfaceHeritage): string => {
					return normalizeNode(extend);
				}).join(", ")}` : ""} ${normalizeNode(node.body)}`;
			case "TSInterfaceHeritage":
				break;
			case "TSIntersectionType":
				return node.types.map((type: Deno.lint.TypeNode): string => {
					const result: string = normalizeNode(type);
					return ((
						type.type === "TSFunctionType" ||
						type.type === "TSIntersectionType" ||
						type.type === "TSUnionType"
					) ? `(${result})` : result);
				}).join(" & ");
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
				return `${normalizeNode(node.label)}${node.optional ? "?" : ""}: ${normalizeNode(node.elementType)}`;
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
				return `${normalizeNode(node.left)}.${normalizeNode(node.right)}`;
			case "TSRestType":
				return `...${normalizeNode(node.typeAnnotation)}`;
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
					return normalizeNode(element);
				}).join(",")}]`;
			case "TSTypeAliasDeclaration":
				break;
			case "TSTypeAnnotation":
				return normalizeNode(node.typeAnnotation);
			case "TSTypeAssertion":
				break;
			case "TSTypeLiteral":
				break;
			case "TSTypeOperator":
				break;
			case "TSTypeParameter":
				break;
			case "TSTypeParameterDeclaration":
				return `<${node.params.map((param: Deno.lint.TSTypeParameter): string => {
					return normalizeNode(param);
				}).join(", ")}>`;
			case "TSTypeParameterInstantiation":
				return `<${node.params.map((param: Deno.lint.TypeNode): string => {
					return normalizeNode(param);
				}).join(", ")}>`;
			case "TSTypePredicate":
				break;
			case "TSTypeQuery":
				break;
			case "TSTypeReference":
				return `${normalizeNode(node.typeName)}${(typeof node.typeArguments === "undefined") ? "" : normalizeNode(node.typeArguments)}`;
			case "TSUndefinedKeyword":
				return "undefined";
			case "TSUnionType":
				return node.types.map((type: Deno.lint.TypeNode): string => {
					const result: string = normalizeNode(type);
					return ((
						type.type === "TSFunctionType" ||
						type.type === "TSIntersectionType" ||
						type.type === "TSUnionType"
					) ? `(${result})` : result);
				}).join(" | ");
			case "TSUnknownKeyword":
				return "unknown";
			case "TSVoidKeyword":
				return "void";
			case "UnaryExpression":
				break;
			case "UpdateExpression":
				break;
			case "VariableDeclaration":
				return `${node.kind} ${node.declarations.map((declaration: Deno.lint.VariableDeclarator): string => {
					return normalizeNode(declaration);
				}).join(", ")}`;
			case "VariableDeclarator":
				return `${normalizeNode(node.id)}${(node.init === null) ? "" : ` = ${normalizeNode(node.init)}`}`;
			case "WhileStatement":
				return `while (${normalizeNode(node.test)}) ${(node.body.type === "BlockStatement") ? normalizeNode(node.body) : `{${normalizeNode(node.body)}}`}`;
			case "WithStatement":
				return `with (${normalizeNode(node.object)}) ${normalizeNode(node.body)}`;
			case "YieldExpression":
				return `yield${node.delegate ? "*" : ""}${(node.argument === null) ? "" : ` ${normalizeNode(node.argument)}`}`;
		}
	}
	//deno-lint-ignore no-empty -- Continue on error (e.g.: stack overflow).
	catch { }
	return `$${node.type} ${crypto.randomUUID().replaceAll("-", "")}$`;
}
export function resolveModuleRelativePath(from: string, to: string): string {
	const result: string = getPathRelative(getPathDirname(from), to).replaceAll("\\", "/");
	return ((
		result.startsWith("./") ||
		result.startsWith("../")
	) ? result : `./${result}`);
}
