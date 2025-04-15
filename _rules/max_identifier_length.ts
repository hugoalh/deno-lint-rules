import type { DenoLintRuleDataPre } from "../_template.ts";
export interface DenoLintRuleMaxIdentifierLengthOptions {
	/**
	 * Whether to check private identifier (i.e.: not exported).
	 * @default {false}
	 */
	checkPrivate?: boolean;
	/**
	 * Whether to check public identifier (i.e.: exported).
	 * @default {true}
	 */
	checkPublic?: boolean;
	/**
	 * Maximum length of the identifier.
	 * @default {40}
	 */
	maximum?: number;
}
function* destructNode(...nodes: readonly (Deno.lint.Identifier | Deno.lint.PrivateIdentifier | Deno.lint.StringLiteral | Deno.lint.Parameter)[]): Generator<Deno.lint.Identifier | Deno.lint.PrivateIdentifier | Deno.lint.StringLiteral> {
	for (const node of nodes) {

	}
}
function ruleAssertor(context: Deno.lint.RuleContext, options: Required<DenoLintRuleMaxIdentifierLengthOptions>, ...nodes: readonly (Deno.lint.Identifier | Deno.lint.PrivateIdentifier | Deno.lint.StringLiteral | Deno.lint.Parameter)[]): void {
	const { maximum }: Required<DenoLintRuleMaxIdentifierLengthOptions> = options;
	for (const node of destructNode(...nodes)) {
		switch (node.type) {
			case "Identifier":
			case "PrivateIdentifier":
				if (node.name.length > maximum) {
					context.report({
						node,
						message: `Identifier \`${node.name}\` too long; Expect: 0 ~ ${maximum}, Current: ${node.name.length}.`
					});
				}
				break;
			case "Literal":
				if (node.value.length > maximum) {
					context.report({
						node,
						message: `Identifier \`${node.value}\` too long; Expect: 0 ~ ${maximum}, Current: ${node.value.length}.`
					});
				}
				break;
		}
	}
}
export const data: DenoLintRuleDataPre<DenoLintRuleMaxIdentifierLengthOptions> = {
	identifier: "max-identifier-length",
	context(options: DenoLintRuleMaxIdentifierLengthOptions = {}): Deno.lint.Rule {
		const {
			maximum = 40,
			checkPrivate = false,
			checkPublic = true
		}: DenoLintRuleMaxIdentifierLengthOptions = options;
		if (!(Number.isSafeInteger(maximum) && maximum >= 0)) {
			throw new RangeError(`Parameter \`maximum\` is not a valid number which is integer, positive, and safe!`);
		}
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				const ruleAssertorBind = ruleAssertor.bind(null, context, {
					checkPrivate,
					checkPublic,
					maximum
				});
				return {
					ArrowFunctionExpression(node: Deno.lint.ArrowFunctionExpression): void {
						ruleAssertorBind(...node.params);
					},
					CatchClause(node: Deno.lint.CatchClause): void {
						if (checkPrivate && node.param !== null) {
							ruleAssertorBind(node.param);
						}
					},
					ClassDeclaration(node: Deno.lint.ClassDeclaration): void {
						const isExported: boolean = (
							node.parent.type === "ExportDefaultDeclaration" ||
							node.parent.type === "ExportNamedDeclaration"
						);
						if ((
							(checkPrivate && !isExported) ||
							(checkPublic && isExported)
						) && node.id !== null) {
							ruleAssertorBind(node.id);
						}
					},
					ClassExpression(node: Deno.lint.ClassExpression): void {
						if (node.id !== null) {
							ruleAssertorBind(node.id);
						}
					},
					ExportAllDeclaration(node: Deno.lint.ExportAllDeclaration): void {
						if (checkPublic && node.exported !== null) {
							ruleAssertorBind(node.exported);
						}
					},
					ExportNamedDeclaration(node: Deno.lint.ExportNamedDeclaration): void {
						if (checkPublic) {
							ruleAssertorBind(...node.specifiers.map(({ exported }: Deno.lint.ExportSpecifier): Deno.lint.Identifier | Deno.lint.StringLiteral => {
								return exported;
							}));
						}
					},
					ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
						if (checkPrivate) {
							ruleAssertorBind(...node.specifiers.map(({ local }: Deno.lint.ImportSpecifier | Deno.lint.ImportDefaultSpecifier | Deno.lint.ImportNamespaceSpecifier): Deno.lint.Identifier => {
								return local;
							}));
						}
					},
					VariableDeclaration(node): void {

					},
					// FunctionDeclaration
					// TSDeclareFunction
					// TSEnumDeclaration
					// TSImportEqualsDeclaration
					// TSInterfaceDeclaration
					// TSModuleDeclaration
					// TSTypeAliasDeclaration
				};
			}
		};
	}
};
