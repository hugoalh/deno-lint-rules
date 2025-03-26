import type { DenoLintRuleDataPre } from "../_template.ts";
import {
	getContextPosition,
	serializeNode,
	type ContextPosition
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
			const entryNodesPosition: readonly string[] = entryNodes.map((entryNode: Deno.lint.TSTypeAliasDeclaration): string => {
				const {
					columnBegin,
					columnEnd,
					lineBegin,
					lineEnd
				}: ContextPosition = getContextPosition(context, entryNode);
				return `- Line ${lineBegin} Column ${columnBegin} ~ Line ${lineEnd} Column ${columnEnd}`;
			});
			for (let index: number = 0; index < entryNodes.length; index += 1) {
				context.report({
					node: entryNodes[index],
					message: `Found duplicate type aliases context, possibly not intended.`,
					hint: `Position of other duplicated type aliases with same context:\n${entryNodesPosition.toSpliced(index, 1).join("\n")}`
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
export const data: DenoLintRuleDataPre = {
	identifier: "no-duplicate-types",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
