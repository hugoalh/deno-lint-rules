import {
	getContextPositionStringFromContext,
	serializeNode,
	type DenoLintRuleData
} from "../_utility.ts";
function serializeSource(node: Deno.lint.ExportAllDeclaration | Deno.lint.ExportNamedDeclaration | Deno.lint.ImportDeclaration): string {
	return `${node.source!.value}::{${node.attributes.map((attribute: Deno.lint.ImportAttribute): string => {
		return serializeNode(attribute);
	}).sort().join(", ")}}`;
}
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
				const entriesByImportedName: Record<string, Deno.lint.ImportSpecifier[]> = {};
				let entryDefault: Deno.lint.ImportDefaultSpecifier | undefined;
				for (const specifier of node.specifiers) {
					if (specifier.type === "ImportDefaultSpecifier") {
						entryDefault = specifier;
					} else if (specifier.type === "ImportSpecifier") {
						const importedName: Deno.lint.Identifier | Deno.lint.StringLiteral = specifier.imported;
						const importedNameSerialize: string = importedName.type === "Literal" ? importedName.value : importedName.name;
						entriesByImportedName[importedNameSerialize] ??= [];
						entriesByImportedName[importedNameSerialize].push(specifier);
					}
				}
				for (const [
					identifier,
					entryNodes
				] of Object.entries(entriesByImportedName)) {
					if (typeof entryDefault !== "undefined" && identifier === "default") {
						const entryNodesD: readonly (Deno.lint.ImportDefaultSpecifier | Deno.lint.ImportSpecifier)[] = [entryDefault, ...entryNodes];
						const entryNodesMeta: readonly string[] = entryNodesD.map((node: Deno.lint.ImportDefaultSpecifier | Deno.lint.ImportSpecifier): string => {
							return `\`${node.local.name}\``;
						});
						for (let index: number = 0; index < entryNodesD.length; index += 1) {
							context.report({
								node: entryNodesD[index],
								message: `Found default import with multiple local identifiers, possibly not intended and is mergeable.`,
								hint: `Other local identifiers with same default import: ${entryNodesMeta.toSpliced(index, 1).join(", ")}`
							});
						}
					} else if (entryNodes.length > 1) {
						const ruleMessage = `Found import \`${identifier}\` with multiple local identifiers, possibly not intended and is mergeable.`;
						const entryNodesMeta: readonly string[] = entryNodes.map((node: Deno.lint.ImportSpecifier): string => {
							return `\`${node.local.name}\``;
						});
						for (let index: number = 0; index < entryNodes.length; index += 1) {
							context.report({
								node: entryNodes[index],
								message: ruleMessage,
								hint: `Other local identifiers with same import: ${entryNodesMeta.toSpliced(index, 1).join(", ")}`
							});
						}
					}
				}
			},
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
							return `- ${getContextPositionStringFromContext(context, node)}`;
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
							return `- ${getContextPositionStringFromContext(context, node)}`;
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
export const ruleData: DenoLintRuleData = {
	identifier: "no-duplicate-imports",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
