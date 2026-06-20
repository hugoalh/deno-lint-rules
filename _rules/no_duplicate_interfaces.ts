import {
	Grouper,
	NodeSerializer,
	NodeVisualPosition,
	type RuleConstructContext
} from "../_utility.ts";
const serializer: NodeSerializer = new NodeSerializer();
function ruleAssertor(context: Deno.lint.RuleContext, statements: readonly Deno.lint.Statement[]): void {
	const grouper: Grouper<Deno.lint.TSInterfaceDeclaration> = new Grouper<Deno.lint.TSInterfaceDeclaration>();
	for (const statement of statements) {
		if (statement.type === "ExportNamedDeclaration" && statement.declaration?.type === "TSInterfaceDeclaration") {
			// export interface
			grouper.add(statement.declaration, serializer.forInterfaceContext(statement.declaration));
		} else if (statement.type === "TSInterfaceDeclaration") {
			// interface
			grouper.add(statement, serializer.forInterfaceContext(statement));
		}
	}
	for (const interfaces of grouper.values()) {
		if (interfaces.length > 1) {
			const interfacesMeta: readonly string[] = interfaces.map((node: Deno.lint.TSInterfaceDeclaration): string => {
				return `- \`${node.id.name}\`; ${new NodeVisualPosition(context, node).toString()}`;
			});
			for (let index: number = 0; index < interfaces.length; index += 1) {
				context.report({
					node: interfaces[index],
					message: `Found multiple interfaces with same context, possibly mergeable.`,
					hint: `Other interfaces with same context:\n${interfacesMeta.toSpliced(index, 1).join("\n")}`
				});
			}
		}
	}
}
export default {
	identifier: "no-duplicate-interfaces",
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
