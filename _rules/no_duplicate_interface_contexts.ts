import {
	getContextPositionStringFromNode,
	IdenticalGrouper,
	serializeInterfaceContext,
	type RuleData
} from "../_utility.ts";
function ruleAssertor(context: Deno.lint.RuleContext, statements: readonly Deno.lint.Statement[]): void {
	const grouperByInterfaceContext: IdenticalGrouper<Deno.lint.TSInterfaceDeclaration> = new IdenticalGrouper<Deno.lint.TSInterfaceDeclaration>();
	for (const statement of statements) {
		if (statement.type === "ExportNamedDeclaration" && statement.declaration?.type === "TSInterfaceDeclaration") {
			// export interface
			grouperByInterfaceContext.add(serializeInterfaceContext(statement.declaration), statement.declaration);
		} else if (statement.type === "TSInterfaceDeclaration") {
			// interface
			grouperByInterfaceContext.add(serializeInterfaceContext(statement), statement);
		}
	}
	for (const interfaces of grouperByInterfaceContext.values()) {
		if (interfaces.length > 1) {
			const interfacesMeta: readonly string[] = interfaces.map((node: Deno.lint.TSInterfaceDeclaration): string => {
				return `- \`${node.id.name}\`; ${getContextPositionStringFromNode(context, node)}`;
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
const ruleContext: Deno.lint.Rule = {
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
export const ruleData: RuleData = {
	identifier: "no-duplicate-interface-contexts",
	sets: [
		"recommended"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
