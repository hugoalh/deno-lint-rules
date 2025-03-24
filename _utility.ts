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
export function standardizeNode(node: Deno.lint.Node): string {
	//deno-lint-ignore hugoalh/no-useless-try
	try {
		switch (node.type) {
			case "ArrayExpression":
				return `[${node.elements.map((element: Deno.lint.Expression | Deno.lint.SpreadElement): string => {
					return standardizeNode(element);
				}).join(", ")}]`;
			case "ArrayPattern":
				break;
			case "ArrowFunctionExpression":
				break;
			case "AssignmentExpression":
			case "BinaryExpression":
			case "LogicalExpression":
				return `${standardizeNode(node.left)} ${node.operator} ${standardizeNode(node.right)}`;
			case "AssignmentPattern":
				return `${standardizeNode(node.left)} = ${standardizeNode(node.right)}`;
			case "AwaitExpression":
				return `await ${standardizeNode(node.argument)}`;
			case "BlockStatement":
				return `{\n\t${node.body.map((statement: Deno.lint.Statement): string => {
					return standardizeNode(statement);
				}).join("\n\t")}\n}`;
			case "BreakStatement":
				return `break${(node.label === null) ? "" : ` ${standardizeNode(node.label)}`}`;
			case "CallExpression":
				return `${standardizeNode(node.callee)}${node.optional ? "?." : ""}${node.typeArguments === null ? "" : standardizeNode(node.typeArguments)}(${node.arguments.map((argument: Deno.lint.Expression | Deno.lint.SpreadElement): string => {
					return standardizeNode(argument);
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
				return `continue${(node.label === null) ? "" : ` ${standardizeNode(node.label)}`}`;
			case "DebuggerStatement":
				return `debugger`;
			case "Decorator":
				break;
			case "DoWhileStatement":
				return `do ${(node.body.type === "BlockStatement") ? standardizeNode(node.body) : `{${standardizeNode(node.body)}}`} while (${standardizeNode(node.test)})`;
			case "ExportAllDeclaration":
				break;
			case "ExportDefaultDeclaration":
				return `export default ${standardizeNode(node.declaration)}`;
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
				return `${node.name}${node.optional ? "?" : ""}${(typeof node.typeAnnotation === "undefined") ? "" : `: ${standardizeNode(node.typeAnnotation)}`}`;
			case "IfStatement":
				return `if (${standardizeNode(node.test)}) ${(node.consequent.type === "BlockStatement") ? standardizeNode(node.consequent) : `{${standardizeNode(node.consequent)}}`}${node.alternate === null ? "" : `else ${(
					node.alternate.type === "BlockStatement" ||
					node.alternate.type === "IfStatement"
				) ? standardizeNode(node.alternate) : `{${standardizeNode(node.alternate)}}`}`}`;
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
			case "MemberExpression":
				return `${standardizeNode(node.object)}${node.optional ? "?" : ""}.${standardizeNode(node.property)}`;
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
					return standardizeNode(statement);
				}).join("\n");
			case "Property":
				break;
			case "PropertyDefinition":
				break;
			case "RestElement":
				break;
			case "ReturnStatement":
				return `return${(node.argument === null) ? "" : ` ${standardizeNode(node.argument)}`}`;
			case "SequenceExpression":
				break;
			case "SpreadElement":
				break;
			case "StaticBlock":
				return `static {\n\t${node.body.map((statement: Deno.lint.Statement): string => {
					return standardizeNode(statement);
				}).join("\n\t")}\n}`;
			case "Super":
				return "super";
			case "SwitchCase":
				return `${(node.test === null) ? "default" : `case ${node.test}`}: ${node.consequent.map((statement: Deno.lint.Statement): string => {
					return standardizeNode(statement);
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
				return `throw ${standardizeNode(node.argument)}`;
			case "TryStatement":
				break;
			case "TSAbstractMethodDefinition":
				break;
			case "TSAbstractPropertyDefinition":
				break;
			case "TSAnyKeyword":
				return "any";
			case "TSArrayType": {
				const result: string = standardizeNode(node.elementType);
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
				const resultFalse: string = standardizeNode(node.falseType);
				const resultTrue: string = standardizeNode(node.trueType);
				return `${standardizeNode(node.checkType)} extends ${standardizeNode(node.extendsType)} ? ${(
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
					return standardizeNode(member);
				}).sort().join(",\n\t")}\n}`;
			case "TSEnumDeclaration":
				return `${node.declare ? "declare " : ""}${node.const ? "const " : ""}enum ${standardizeNode(node.id)} ${standardizeNode(node.body)}`;
			case "TSEnumMember":
				return `${standardizeNode(node.id)}${(typeof node.initializer === "undefined") ? "" : ` = ${standardizeNode(node.initializer)}`}`;
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
					return standardizeNode(property);
				}).sort().join("\n\t")}\n}`;
			case "TSInterfaceDeclaration":
				return `interface ${standardizeNode(node.id)}${(typeof node.typeParameters === "undefined") ? "" : standardizeNode(node.typeParameters)}${(node.extends.length > 0) ? `extends ${node.extends.map((extend: Deno.lint.TSInterfaceHeritage): string => {
					return standardizeNode(extend);
				}).join(", ")}` : ""} ${standardizeNode(node.body)}`;
			case "TSInterfaceHeritage":
				return `${standardizeNode(node.expression)}${(typeof node.typeArguments === "undefined") ? "" : standardizeNode(node.typeArguments)}`;
			case "TSIntersectionType":
				return node.types.map((type: Deno.lint.TypeNode): string => {
					const result: string = standardizeNode(type);
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
				return `${standardizeNode(node.label)}${node.optional ? "?" : ""}: ${standardizeNode(node.elementType)}`;
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
				return `${standardizeNode(node.left)}.${standardizeNode(node.right)}`;
			case "TSRestType":
				return `...${standardizeNode(node.typeAnnotation)}`;
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
					return standardizeNode(element);
				}).join(",")}]`;
			case "TSTypeAliasDeclaration":
				break;
			case "TSTypeAnnotation":
				return standardizeNode(node.typeAnnotation);
			case "TSTypeAssertion":
				break;
			case "TSTypeLiteral":
				break;
			case "TSTypeOperator":
				return `${node.operator} ${standardizeNode(node.typeAnnotation)}`;
			case "TSTypeParameter":
				break;
			case "TSTypeParameterDeclaration":
				return `<${node.params.map((param: Deno.lint.TSTypeParameter): string => {
					return standardizeNode(param);
				}).join(", ")}>`;
			case "TSTypeParameterInstantiation":
				return `<${node.params.map((param: Deno.lint.TypeNode): string => {
					return standardizeNode(param);
				}).join(", ")}>`;
			case "TSTypePredicate":
				break;
			case "TSTypeQuery":
				break;
			case "TSTypeReference":
				return `${standardizeNode(node.typeName)}${(typeof node.typeArguments === "undefined") ? "" : standardizeNode(node.typeArguments)}`;
			case "TSUndefinedKeyword":
				return "undefined";
			case "TSUnionType":
				return node.types.map((type: Deno.lint.TypeNode): string => {
					const result: string = standardizeNode(type);
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
				return (node.prefix ? `${node.operator}${standardizeNode(node.argument)}` : `${standardizeNode(node.argument)}${node.operator}`);
			case "VariableDeclaration":
				return `${node.kind} ${node.declarations.map((declaration: Deno.lint.VariableDeclarator): string => {
					return standardizeNode(declaration);
				}).join(", ")}`;
			case "VariableDeclarator":
				return `${standardizeNode(node.id)}${(node.init === null) ? "" : ` = ${standardizeNode(node.init)}`}`;
			case "WhileStatement":
				return `while (${standardizeNode(node.test)}) ${(node.body.type === "BlockStatement") ? standardizeNode(node.body) : `{${standardizeNode(node.body)}}`}`;
			case "WithStatement":
				return `with (${standardizeNode(node.object)}) ${standardizeNode(node.body)}`;
			case "YieldExpression":
				return `yield${node.delegate ? "*" : ""}${(node.argument === null) ? "" : ` ${standardizeNode(node.argument)}`}`;
		}
	}
	//deno-lint-ignore no-empty -- Continue on error (e.g.: stack overflow).
	catch { }
	return `$$${node.type} ${crypto.randomUUID().replaceAll("-", "")}$$`;
}
export function resolveModuleRelativePath(from: string, to: string): string {
	const result: string = getPathRelative(getPathDirname(from), to).replaceAll("\\", "/");
	return ((
		result.startsWith("./") ||
		result.startsWith("../")
	) ? result : `./${result}`);
}
