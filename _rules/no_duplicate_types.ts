import {
	Grouper,
	NodeSerializer,
	NodeVisualPosition,
	type RuleConstructContext
} from "../_utility.ts";
const serializer: NodeSerializer = new NodeSerializer();
function ruleAssertor(context: Deno.lint.RuleContext, statements: readonly Deno.lint.Statement[]): void {
	const grouper: Grouper<Deno.lint.TSTypeAliasDeclaration> = new Grouper<Deno.lint.TSTypeAliasDeclaration>();
	for (const statement of statements) {
		if (statement.type === "ExportNamedDeclaration" && statement.declaration?.type === "TSTypeAliasDeclaration") {
			// export type
			grouper.add(statement.declaration, serializer.for(statement.declaration.typeAnnotation));
		} else if (statement.type === "TSTypeAliasDeclaration") {
			// type
			grouper.add(statement, serializer.for(statement.typeAnnotation));
		}
	}
	for (const types of grouper.values()) {
		if (types.length > 1) {
			const typesMeta: readonly string[] = types.map((node: Deno.lint.TSTypeAliasDeclaration): string => {
				return `- \`${node.id.name}\` (${new NodeVisualPosition(context, node).toString()})`;
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
export default {
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
} satisfies RuleConstructContext as RuleConstructContext;
