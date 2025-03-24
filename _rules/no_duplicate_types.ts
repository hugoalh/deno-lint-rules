import type { DenoLintRuleDataPre } from "../_template.ts";
import {
	getContextPosition,
	standardizeNode,
	type ContextPosition
} from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			Program(node: Deno.lint.Program): void {
				const entries: Record<string, Deno.lint.TSTypeAliasDeclaration[]> = {};
				function addEntry(node: Deno.lint.TSTypeAliasDeclaration): void {
					const nodeAnnotationStandardize: string = standardizeNode(node.typeAnnotation);
					entries[nodeAnnotationStandardize] ??= [];
					entries[nodeAnnotationStandardize].push(node);
				}
				for (const statement of node.body) {
					if (statement.type === "ExportNamedDeclaration" && statement.declaration?.type === "TSTypeAliasDeclaration") {
						// export type
						addEntry(statement.declaration);
					} else if (statement.type === "TSTypeAliasDeclaration") {
						// type
						addEntry(statement);
					}
				}
				for (const entryNodes of Object.values(entries)) {
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
								message: `Found duplicate type aliases, possibly mergeable.`,
								hint: `Position of other duplicated type aliases:\n${entryNodesPosition.toSpliced(index, 1).join("\n")}`
							});
						}
					}
				}
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
