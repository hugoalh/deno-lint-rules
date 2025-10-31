import {
	getVisualPositionStringFromNode,
	IdenticalGrouper,
	NodeSerializer,
	type RuleData
} from "../_utility.ts";
const serializer: NodeSerializer = new NodeSerializer();
function ruleAssertor(context: Deno.lint.RuleContext, statements: readonly Deno.lint.Statement[]): void {
	const grouperByTypeContext: IdenticalGrouper<Deno.lint.TSTypeAliasDeclaration> = new IdenticalGrouper<Deno.lint.TSTypeAliasDeclaration>();
	for (const statement of statements) {
		if (statement.type === "ExportNamedDeclaration" && statement.declaration?.type === "TSTypeAliasDeclaration") {
			// export type
			grouperByTypeContext.add(serializer.for(statement.declaration.typeAnnotation), statement.declaration);
		} else if (statement.type === "TSTypeAliasDeclaration") {
			// type
			grouperByTypeContext.add(serializer.for(statement.typeAnnotation), statement);
		}
	}
	for (const types of grouperByTypeContext.values()) {
		if (types.length > 1) {
			const typesMeta: readonly string[] = types.map((node: Deno.lint.TSTypeAliasDeclaration): string => {
				return `- \`${node.id.name}\`; ${getVisualPositionStringFromNode(context, node)}`;
			});
			for (let index: number = 0; index < types.length; index += 1) {
				context.report({
					node: types[index],
					message: `Found multiple types with same context, possibly mergeable.`,
					hint: `Other types with same context:\n${typesMeta.toSpliced(index, 1).join("\n")}`
				});
			}
		}
	}
}
export const ruleData: RuleData = {
	identifier: "no-duplicate-types",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					BlockStatement(node: Deno.lint.BlockStatement): void {
						ruleAssertor(context, node.body);
					},
					Program(node: Deno.lint.Program): void {
						ruleAssertor(context, node.body);
					}
				};
			}
		};
	}
};
