import {
	getContextPositionStringFromContext,
	serializeNode,
	type DenoLintRuleData
} from "../_utility.ts";
function ruleAssertor(context: Deno.lint.RuleContext, statements: readonly Deno.lint.Statement[]): void {
	const entriesByContext: Record<string, Deno.lint.TSTypeAliasDeclaration[]> = {};
	function addEntry(node: Deno.lint.TSTypeAliasDeclaration): void {
		const contextSerialize: string = serializeNode(node.typeAnnotation);
		entriesByContext[contextSerialize] ??= [];
		entriesByContext[contextSerialize].push(node);
	}
	for (const statement of statements) {
		if (statement.type === "ExportNamedDeclaration" && statement.declaration?.type === "TSTypeAliasDeclaration") {
			// export type
			addEntry(statement.declaration);
		} else if (statement.type === "TSTypeAliasDeclaration") {
			// type
			addEntry(statement);
		}
	}
	for (const entryNodes of Object.values(entriesByContext)) {
		if (entryNodes.length > 1) {
			const entryNodesMeta: readonly string[] = entryNodes.map((entryNode: Deno.lint.TSTypeAliasDeclaration): string => {
				return `- \`${entryNode.id.name}\`; ${getContextPositionStringFromContext(context, entryNode)}`;
			});
			for (let index: number = 0; index < entryNodes.length; index += 1) {
				context.report({
					node: entryNodes[index],
					message: `Found multiple types with same context, possibly not intended and is mergeable.`,
					hint: `Other types with same context:\n${entryNodesMeta.toSpliced(index, 1).join("\n")}`
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
export const ruleData: DenoLintRuleData = {
	identifier: "no-duplicate-types",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
