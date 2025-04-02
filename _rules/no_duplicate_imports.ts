import type { DenoLintRuleDataPre } from "../_template.ts";
import {
	getContextPosition,
	serializeNode,
	type ContextPosition
} from "../_utility.ts";
function serializeSource(node: Deno.lint.ExportAllDeclaration | Deno.lint.ExportNamedDeclaration | Deno.lint.ImportDeclaration): string {
	return `${node.source!.value}::{${node.attributes.map((attribute: Deno.lint.ImportAttribute): string => {
		return serializeNode(attribute);
	}).sort().join(", ")}}`;
}
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			Program(node: Deno.lint.Program): void {
				const entriesBySourceExport: Record<string, (Deno.lint.ExportAllDeclaration | Deno.lint.ExportNamedDeclaration)[]> = {};
				const entriesBySourceImport: Record<string, Deno.lint.ImportDeclaration[]> = {};
				for (const statement of node.body) {
					switch (statement.type) {
						case "ExportNamedDeclaration":
							if (statement.source === null) {
								continue;
							}
							/* FALL THROUGH */
						case "ExportAllDeclaration": {
							const sourceSerialize: string = serializeSource(statement);
							entriesBySourceExport[sourceSerialize] ??= [];
							entriesBySourceExport[sourceSerialize].push(statement);
							break;
						}
						case "ImportDeclaration": {
							const sourceSerialize: string = serializeSource(statement);
							entriesBySourceImport[sourceSerialize] ??= [];
							entriesBySourceImport[sourceSerialize].push(statement);
							break;
						}
					}
				}
				for (const entryNodes of Object.values(entriesBySourceExport)) {
					if (entryNodes.length > 1) {
						const entryNodesMeta: readonly string[] = entryNodes.map((node: Deno.lint.ExportAllDeclaration | Deno.lint.ExportNamedDeclaration): string => {
							const {
								columnBegin,
								columnEnd,
								lineBegin,
								lineEnd
							}: ContextPosition = getContextPosition(context, node);
							return `- Line ${lineBegin} Column ${columnBegin} ~ Line ${lineEnd} Column ${columnEnd}`;
						});
						for (let index: number = 0; index < entryNodes.length; index += 1) {
							context.report({
								node: entryNodes[index],
								message: `Found multiple exports with same source, possibly not intended and is mergeable.`,
								hint: `Other exports with same source:\n${entryNodesMeta.toSpliced(index, 1).join("\n")}`
							});
						}
					}
				}
				for (const entryNodes of Object.values(entriesBySourceImport)) {
					if (entryNodes.length > 1) {
						const entryNodesMeta: readonly string[] = entryNodes.map((node: Deno.lint.ImportDeclaration): string => {
							const {
								columnBegin,
								columnEnd,
								lineBegin,
								lineEnd
							}: ContextPosition = getContextPosition(context, node);
							return `- Line ${lineBegin} Column ${columnBegin} ~ Line ${lineEnd} Column ${columnEnd}`;
						});
						for (let index: number = 0; index < entryNodes.length; index += 1) {
							context.report({
								node: entryNodes[index],
								message: `Found multiple imports with same source, possibly not intended and is mergeable.`,
								hint: `Other imports with same source:\n${entryNodesMeta.toSpliced(index, 1).join("\n")}`
							});
						}
					}
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-duplicate-imports",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
