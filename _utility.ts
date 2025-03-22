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
export function getNodeSlug(node: Exclude<Deno.lint.Node, Deno.lint.Program>): string {
	//deno-lint-ignore hugoalh/no-useless-try
	try {
		switch (node.type) {
			case "ArrayExpression":
				break;
			case "ArrayPattern":
				break;
			case "ArrowFunctionExpression":
				break;
			case "AssignmentExpression":
				break;
			case "AssignmentPattern":
				break;
			case "AwaitExpression":
				break;
			case "BinaryExpression":
				break;
			case "BlockStatement":
				return `{\n${node.body.map((statement: Deno.lint.Statement): string => {
					return getNodeSlug(statement);
				}).join("\n")}\n}`;
			case "BreakStatement":
				return `break${(node.label === null) ? "" : ` ${getNodeSlug(node.label)}`}`;
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
				return `continue${(node.label === null) ? "" : ` ${getNodeSlug(node.label)}`}`;
			case "DebuggerStatement":
				return `debugger`;
			case "Decorator":
				break;
			case "DoWhileStatement":
				return `do ${(node.body.type === "BlockStatement") ? getNodeSlug(node.body) : `{${getNodeSlug(node.body)}}`} while (${getNodeSlug(node.test)})`;
			case "ExportAllDeclaration":
				break;
			case "ExportDefaultDeclaration":
				break;
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
				return `${node.name}${node.optional ? "?" : ""}${(typeof node.typeAnnotation === "undefined") ? "" : `: ${getNodeSlug(node.typeAnnotation)}`}`;
			case "IfStatement":
				return `if (${getNodeSlug(node.test)}) ${(node.consequent.type === "BlockStatement") ? getNodeSlug(node.consequent) : `{${getNodeSlug(node.consequent)}}`}${node.alternate === null ? "" : `else ${(
					node.alternate.type === "BlockStatement" ||
					node.alternate.type === "IfStatement"
				) ? getNodeSlug(node.alternate) : `{${getNodeSlug(node.alternate)}}`}`}`;
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
				return `return${(node.argument === null) ? "" : ` ${getNodeSlug(node.argument)}`}`;
			case "SequenceExpression":
				break;
			case "SpreadElement":
				break;
			case "StaticBlock":
				break;
			case "Super":
				break;
			case "SwitchCase":
				return `${(node.test === null) ? "default" : `case ${node.test}`}: ${node.consequent.map((statement: Deno.lint.Statement): string => {
					return getNodeSlug(statement);
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
				break;
			case "TryStatement":
				break;
			case "TSAbstractMethodDefinition":
				break;
			case "TSAbstractPropertyDefinition":
				break;
			case "TSAnyKeyword":
				return "any";
			case "TSArrayType": {
				const result: string = getNodeSlug(node.elementType);
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
				const resultFalse: string = getNodeSlug(node.falseType);
				const resultTrue: string = getNodeSlug(node.trueType);
				return `${getNodeSlug(node.checkType)} extends ${getNodeSlug(node.extendsType)} ? ${(
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
				break;
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
					return getNodeSlug(property);
				}).sort().join("\n\t")}\n}`;
			case "TSInterfaceDeclaration":
				return `interface ${getNodeSlug(node.id)}${(typeof node.typeParameters === "undefined") ? "" : getNodeSlug(node.typeParameters)}${(node.extends.length > 0) ? `extends ${node.extends.map((extend: Deno.lint.TSInterfaceHeritage): string => {
					return getNodeSlug(extend);
				}).join(", ")}` : ""} ${getNodeSlug(node.body)}`;
			case "TSInterfaceHeritage":
				break;
			case "TSIntersectionType":
				return node.types.map((type: Deno.lint.TypeNode): string => {
					const result: string = getNodeSlug(type);
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
				return `${getNodeSlug(node.label)}${node.optional ? "?" : ""}: ${getNodeSlug(node.elementType)}`;
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
				return `${getNodeSlug(node.left)}.${getNodeSlug(node.right)}`;
			case "TSRestType":
				return `...${getNodeSlug(node.typeAnnotation)}`;
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
					return getNodeSlug(element);
				}).join(",")}]`;
			case "TSTypeAliasDeclaration":
				break;
			case "TSTypeAnnotation":
				break;
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
					return getNodeSlug(param);
				}).join(", ")}>`;
			case "TSTypeParameterInstantiation":
				return `<${node.params.map((param: Deno.lint.TypeNode): string => {
					return getNodeSlug(param);
				}).join(", ")}>`;
			case "TSTypePredicate":
				break;
			case "TSTypeQuery":
				break;
			case "TSTypeReference":
				return `${getNodeSlug(node.typeName)}${(typeof node.typeArguments === "undefined") ? "" : getNodeSlug(node.typeArguments)}`;
			case "TSUndefinedKeyword":
				return "undefined";
			case "TSUnionType":
				return node.types.map((type: Deno.lint.TypeNode): string => {
					const result: string = getNodeSlug(type);
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
				break;
			case "VariableDeclarator":
				break;
			case "WhileStatement":
				return `while (${getNodeSlug(node.test)}) ${(node.body.type === "BlockStatement") ? getNodeSlug(node.body) : `{${getNodeSlug(node.body)}}`}`;
			case "WithStatement":
				break;
			case "YieldExpression":
				break;
		}
	}
	//deno-lint-ignore no-empty -- Continue on error (e.g.: stack overflow).
	catch { }
	return `$${node.type} ${crypto.randomUUID().replaceAll("-", "")}$`;
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
