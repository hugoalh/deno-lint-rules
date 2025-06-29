import {
	areNodesSame,
	type RuleData
} from "../_utility.ts";
export interface RuleMaxComplexityOptions {
	/**
	 * Maximum complexity of the code.
	 * @default {32}
	 */
	maximum?: number;
}
function ruleAssertor(options: Required<RuleMaxComplexityOptions>, context: Deno.lint.RuleContext, node: Deno.lint.Node): void {
	const { maximum }: Required<RuleMaxComplexityOptions> = options;
	const ancestors: readonly Deno.lint.Node[] = context.sourceCode.getAncestors(node);
	let complexity: number = ancestors.length;
	for (let index: number = 0; index < ancestors.length; index += 1) {
		const current: Deno.lint.Node = ancestors[index];
		const parent: Deno.lint.Node | undefined = ancestors[index - 1];
		const child: Deno.lint.Node | undefined = ancestors[index + 1];
		if (
			// Directly
			current.type === "CatchClause" ||
			current.type === "ClassBody" ||
			current.type === "Program" ||
			current.type === "TSEnumBody" ||
			current.type === "TSInterfaceBody" ||

			// Conditionally
			(current.type === "BlockStatement" && (
				parent?.type === "ArrowFunctionExpression" ||
				parent?.type === "CatchClause" ||
				parent?.type === "DoWhileStatement" ||
				parent?.type === "ForInStatement" ||
				parent?.type === "ForOfStatement" ||
				parent?.type === "ForStatement" ||
				parent?.type === "FunctionDeclaration" ||
				parent?.type === "FunctionExpression" ||
				parent?.type === "IfStatement" ||
				parent?.type === "StaticBlock" ||
				parent?.type === "SwitchCase" ||
				parent?.type === "TryStatement" ||
				parent?.type === "WhileStatement" ||
				parent?.type === "WithStatement"
			)) ||
			((
				current.type === "DoWhileStatement" ||
				current.type === "WhileStatement"
			) && typeof child !== "undefined" && areNodesSame([current.test, child], context)) ||
			(
				(
					current.type === "ForInStatement" ||
					current.type === "ForOfStatement"
				) && typeof child !== "undefined" && (
					areNodesSame([current.left, child], context) ||
					areNodesSame([current.right, child], context)
				)
			) ||
			(current.type === "ForStatement" && typeof child !== "undefined" && (
				(current.init !== null && areNodesSame([current.init, child], context)) ||
				(current.test !== null && areNodesSame([current.test, child], context)) ||
				(current.update !== null && areNodesSame([current.update, child], context))
			))
		) {
			complexity -= 1;
		}
	}
	if (complexity > maximum) {
		context.report({
			node,
			message: `Too complex; Maximum: ${maximum}, Current: ${complexity}.`
		});
	}
}
export const ruleData: RuleData<RuleMaxComplexityOptions> = {
	identifier: "max-complexity",
	context(options: RuleMaxComplexityOptions = {}): Deno.lint.Rule {
		const { maximum = 32 }: RuleMaxComplexityOptions = options;
		if (!(Number.isSafeInteger(maximum) && maximum >= 0)) {
			throw new RangeError(`Parameter \`maximum\` is not a valid number which is integer, positive, and safe!`);
		}
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				const ruleAssertorBind = ruleAssertor.bind(null, { maximum }, context);
				return {
					ArrayExpression: ruleAssertorBind,
					ArrayPattern: ruleAssertorBind,
					ArrowFunctionExpression: ruleAssertorBind,
					AssignmentExpression: ruleAssertorBind,
					AssignmentPattern: ruleAssertorBind,
					AwaitExpression: ruleAssertorBind,
					BinaryExpression: ruleAssertorBind,
					BlockStatement: ruleAssertorBind,
					BreakStatement: ruleAssertorBind,
					CallExpression: ruleAssertorBind,
					ChainExpression: ruleAssertorBind,
					ClassDeclaration: ruleAssertorBind,
					ClassExpression: ruleAssertorBind,
					ConditionalExpression: ruleAssertorBind,
					ContinueStatement: ruleAssertorBind,
					DebuggerStatement: ruleAssertorBind,
					Decorator: ruleAssertorBind,
					DoWhileStatement: ruleAssertorBind,
					ExportAllDeclaration: ruleAssertorBind,
					ExportDefaultDeclaration: ruleAssertorBind,
					ExportNamedDeclaration: ruleAssertorBind,
					ExportSpecifier: ruleAssertorBind,
					ExpressionStatement: ruleAssertorBind,
					ForInStatement: ruleAssertorBind,
					ForOfStatement: ruleAssertorBind,
					ForStatement: ruleAssertorBind,
					FunctionDeclaration: ruleAssertorBind,
					FunctionExpression: ruleAssertorBind,
					Identifier: ruleAssertorBind,
					IfStatement: ruleAssertorBind,
					ImportAttribute: ruleAssertorBind,
					ImportDeclaration: ruleAssertorBind,
					ImportDefaultSpecifier: ruleAssertorBind,
					ImportExpression: ruleAssertorBind,
					ImportNamespaceSpecifier: ruleAssertorBind,
					ImportSpecifier: ruleAssertorBind,
					JSXAttribute: ruleAssertorBind,
					JSXClosingElement: ruleAssertorBind,
					JSXClosingFragment: ruleAssertorBind,
					JSXElement: ruleAssertorBind,
					JSXEmptyExpression: ruleAssertorBind,
					JSXExpressionContainer: ruleAssertorBind,
					JSXFragment: ruleAssertorBind,
					JSXIdentifier: ruleAssertorBind,
					JSXMemberExpression: ruleAssertorBind,
					JSXNamespacedName: ruleAssertorBind,
					JSXOpeningElement: ruleAssertorBind,
					JSXOpeningFragment: ruleAssertorBind,
					JSXSpreadAttribute: ruleAssertorBind,
					JSXText: ruleAssertorBind,
					LabeledStatement: ruleAssertorBind,
					Literal: ruleAssertorBind,
					LogicalExpression: ruleAssertorBind,
					MemberExpression: ruleAssertorBind,
					MetaProperty: ruleAssertorBind,
					MethodDefinition: ruleAssertorBind,
					NewExpression: ruleAssertorBind,
					ObjectExpression: ruleAssertorBind,
					ObjectPattern: ruleAssertorBind,
					PrivateIdentifier: ruleAssertorBind,
					Property: ruleAssertorBind,
					PropertyDefinition: ruleAssertorBind,
					RestElement: ruleAssertorBind,
					ReturnStatement: ruleAssertorBind,
					SequenceExpression: ruleAssertorBind,
					SpreadElement: ruleAssertorBind,
					StaticBlock: ruleAssertorBind,
					Super: ruleAssertorBind,
					SwitchCase: ruleAssertorBind,
					SwitchStatement: ruleAssertorBind,
					TaggedTemplateExpression: ruleAssertorBind,
					TemplateElement: ruleAssertorBind,
					TemplateLiteral: ruleAssertorBind,
					ThisExpression: ruleAssertorBind,
					ThrowStatement: ruleAssertorBind,
					TryStatement: ruleAssertorBind,
					TSAbstractMethodDefinition: ruleAssertorBind,
					TSAbstractPropertyDefinition: ruleAssertorBind,
					TSAnyKeyword: ruleAssertorBind,
					TSArrayType: ruleAssertorBind,
					TSAsExpression: ruleAssertorBind,
					TSBigIntKeyword: ruleAssertorBind,
					TSBooleanKeyword: ruleAssertorBind,
					TSCallSignatureDeclaration: ruleAssertorBind,
					TSClassImplements: ruleAssertorBind,
					TSConditionalType: ruleAssertorBind,
					TSConstructSignatureDeclaration: ruleAssertorBind,
					TSDeclareFunction: ruleAssertorBind,
					TSEmptyBodyFunctionExpression: ruleAssertorBind,
					TSEnumDeclaration: ruleAssertorBind,
					TSEnumMember: ruleAssertorBind,
					TSExportAssignment: ruleAssertorBind,
					TSExternalModuleReference: ruleAssertorBind,
					TSFunctionType: ruleAssertorBind,
					TSImportEqualsDeclaration: ruleAssertorBind,
					TSImportType: ruleAssertorBind,
					TSIndexedAccessType: ruleAssertorBind,
					TSIndexSignature: ruleAssertorBind,
					TSInferType: ruleAssertorBind,
					TSInstantiationExpression: ruleAssertorBind,
					TSInterfaceDeclaration: ruleAssertorBind,
					TSInterfaceHeritage: ruleAssertorBind,
					TSIntersectionType: ruleAssertorBind,
					TSIntrinsicKeyword: ruleAssertorBind,
					TSLiteralType: ruleAssertorBind,
					TSMappedType: ruleAssertorBind,
					TSMethodSignature: ruleAssertorBind,
					TSModuleBlock: ruleAssertorBind,
					TSModuleDeclaration: ruleAssertorBind,
					TSNamedTupleMember: ruleAssertorBind,
					TSNamespaceExportDeclaration: ruleAssertorBind,
					TSNeverKeyword: ruleAssertorBind,
					TSNonNullExpression: ruleAssertorBind,
					TSNullKeyword: ruleAssertorBind,
					TSNumberKeyword: ruleAssertorBind,
					TSObjectKeyword: ruleAssertorBind,
					TSOptionalType: ruleAssertorBind,
					TSPropertySignature: ruleAssertorBind,
					TSQualifiedName: ruleAssertorBind,
					TSRestType: ruleAssertorBind,
					TSSatisfiesExpression: ruleAssertorBind,
					TSStringKeyword: ruleAssertorBind,
					TSSymbolKeyword: ruleAssertorBind,
					TSTemplateLiteralType: ruleAssertorBind,
					TSThisType: ruleAssertorBind,
					TSTupleType: ruleAssertorBind,
					TSTypeAliasDeclaration: ruleAssertorBind,
					TSTypeAnnotation: ruleAssertorBind,
					TSTypeAssertion: ruleAssertorBind,
					TSTypeLiteral: ruleAssertorBind,
					TSTypeOperator: ruleAssertorBind,
					TSTypeParameter: ruleAssertorBind,
					TSTypeParameterDeclaration: ruleAssertorBind,
					TSTypeParameterInstantiation: ruleAssertorBind,
					TSTypePredicate: ruleAssertorBind,
					TSTypeQuery: ruleAssertorBind,
					TSTypeReference: ruleAssertorBind,
					TSUndefinedKeyword: ruleAssertorBind,
					TSUnionType: ruleAssertorBind,
					TSUnknownKeyword: ruleAssertorBind,
					TSVoidKeyword: ruleAssertorBind,
					UnaryExpression: ruleAssertorBind,
					UpdateExpression: ruleAssertorBind,
					VariableDeclaration: ruleAssertorBind,
					VariableDeclarator: ruleAssertorBind,
					WhileStatement: ruleAssertorBind,
					WithStatement: ruleAssertorBind,
					YieldExpression: ruleAssertorBind
				};
			}
		};
	}
};
