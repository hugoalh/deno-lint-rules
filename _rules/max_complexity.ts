import {
	areSameNodes,
	type DenoLintRuleData
} from "../_utility.ts";
export interface DenoLintRuleMaxComplexityOptions {
	/**
	 * Maximum complexity of the code.
	 * @default {32}
	 */
	maximum?: number;
}
function ruleAssertor(context: Deno.lint.RuleContext, options: Required<DenoLintRuleMaxComplexityOptions>, node: Deno.lint.Node): void {
	const { maximum }: Required<DenoLintRuleMaxComplexityOptions> = options;
	const ancestors: readonly Deno.lint.Node[] = context.sourceCode.getAncestors(node);
	let complexity: number = 0;
	for (let index: number = 0; index < ancestors.length; index += 1) {
		const ancestor: Deno.lint.Node = ancestors[index];
		if (
			ancestor.type === "CatchClause" ||
			ancestor.type === "ClassBody" ||
			ancestor.type === "Program" ||
			ancestor.type === "TSEnumBody" ||
			ancestor.type === "TSInterfaceBody"
		) {
			continue;
		}
		if (ancestor.type === "BlockStatement") {
			const ancestorParent: Deno.lint.Node | undefined = ancestors[index - 1];
			if (
				ancestorParent?.type === "ArrowFunctionExpression" ||
				ancestorParent?.type === "CatchClause" ||
				ancestorParent?.type === "DoWhileStatement" ||
				ancestorParent?.type === "ForInStatement" ||
				ancestorParent?.type === "ForOfStatement" ||
				ancestorParent?.type === "ForStatement" ||
				ancestorParent?.type === "FunctionDeclaration" ||
				ancestorParent?.type === "FunctionExpression" ||
				ancestorParent?.type === "IfStatement" ||
				ancestorParent?.type === "StaticBlock" ||
				ancestorParent?.type === "SwitchCase" ||
				ancestorParent?.type === "TryStatement" ||
				ancestorParent?.type === "WhileStatement" ||
				ancestorParent?.type === "WithStatement"
			) {
				continue;
			}
		}
		if (
			ancestor.type === "DoWhileStatement" ||
			ancestor.type === "WhileStatement"
		) {
			const ancestorChild: Deno.lint.Node | undefined = ancestors[index + 1];
			if (typeof ancestorChild !== "undefined" && areSameNodes([ancestor.test, ancestorChild], context)) {
				continue;
			}
		}
		if (
			ancestor.type === "ForInStatement" ||
			ancestor.type === "ForOfStatement"
		) {
			const ancestorChild: Deno.lint.Node | undefined = ancestors[index + 1];
			if (typeof ancestorChild !== "undefined" && (
				areSameNodes([ancestor.left, ancestorChild], context) ||
				areSameNodes([ancestor.right, ancestorChild], context)
			)) {
				continue;
			}
		}
		if (ancestor.type === "ForStatement") {
			const ancestorChild: Deno.lint.Node | undefined = ancestors[index + 1];
			if (typeof ancestorChild !== "undefined" && (
				(ancestor.init !== null && areSameNodes([ancestor.init, ancestorChild], context)) ||
				(ancestor.test !== null && areSameNodes([ancestor.test, ancestorChild], context)) ||
				(ancestor.update !== null && areSameNodes([ancestor.update, ancestorChild], context))
			)) {
				continue;
			}
		}
		complexity += 1;
	}
	if (complexity > maximum) {
		context.report({
			node,
			message: `Too complex; Maximum: ${maximum}, Current: ${complexity}.`
		});
	}
}
export const ruleData: DenoLintRuleData<DenoLintRuleMaxComplexityOptions> = {
	identifier: "max-complexity",
	context(options: DenoLintRuleMaxComplexityOptions = {}): Deno.lint.Rule {
		const { maximum = 32 }: DenoLintRuleMaxComplexityOptions = options;
		if (!(Number.isSafeInteger(maximum) && maximum >= 0)) {
			throw new RangeError(`Parameter \`maximum\` is not a valid number which is integer, positive, and safe!`);
		}
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				const ruleAssertorBind = ruleAssertor.bind(null, context, { maximum });
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
