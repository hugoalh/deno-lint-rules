import {
	getContextPositionStringFromNode,
	isNodeStringLiteral,
	serializeNode,
	type RuleData
} from "../_utility.ts";
function serializeSource(node: Deno.lint.ExportAllDeclaration | Deno.lint.ExportNamedDeclaration | Deno.lint.ImportDeclaration): string {
	return `${node.source!.value}::{${node.attributes.map((attribute: Deno.lint.ImportAttribute): string => {
		return serializeNode(attribute);
	}).sort().join(", ")}}`;
}
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		const entriesByImportDynamicSource: Record<string, Deno.lint.ImportExpression[]> = {};
		const entriesByImportStaticSource: Record<string, Deno.lint.ImportDeclaration[]> = {};
		return {
			ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
				// Collect all of the static imports, then check whether the source is exist in dynamic imports and static imports later.
				const sourceSerialize: string = serializeSource(node);
				entriesByImportStaticSource[sourceSerialize] ??= [];
				entriesByImportStaticSource[sourceSerialize].push(node);

				// Check whether the imported identifier has multiple local identifier.
				const entriesByImportedIdentifier: Record<string, Deno.lint.ImportSpecifier[]> = {};
				let entryImportedDefault: Deno.lint.ImportDefaultSpecifier | undefined;
				for (const specifier of node.specifiers) {
					switch (specifier.type) {
						case "ImportDefaultSpecifier":
							entryImportedDefault = specifier;
							break;
						case "ImportSpecifier": {
							const importedName: Deno.lint.Identifier | Deno.lint.StringLiteral = specifier.imported;
							const importedNameSerialize: string = (importedName.type === "Literal") ? importedName.value : importedName.name;
							entriesByImportedIdentifier[importedNameSerialize] ??= [];
							entriesByImportedIdentifier[importedNameSerialize].push(specifier);
							break;
						}
					}
				}
				for (const [
					identifier,
					entryNodes
				] of Object.entries(entriesByImportedIdentifier)) {
					if (typeof entryImportedDefault !== "undefined" && identifier === "default") {
						const entryNodesD: readonly (Deno.lint.ImportDefaultSpecifier | Deno.lint.ImportSpecifier)[] = [entryImportedDefault, ...entryNodes];
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
			ImportExpression(node: Deno.lint.ImportExpression): void {
				// Collect all of the dynamic imports, then check whether the source is exist in dynamic imports and static imports later.
				if (isNodeStringLiteral(node.source) && node.options === null) {
					const sourceSerialize = `${node.source.value}::{}`;
					entriesByImportDynamicSource[sourceSerialize] ??= [];
					entriesByImportDynamicSource[sourceSerialize].push(node);
				}
			},
			Program(node: Deno.lint.Program): void {
				const entriesByExportAllSource: Record<string, Deno.lint.ExportAllDeclaration[]> = {};
				const entriesByExportNamedSource: Record<string, Deno.lint.ExportNamedDeclaration[]> = {};
				for (const statement of node.body) {
					switch (statement.type) {
						case "ExportAllDeclaration": {
							const sourceSerialize: string = serializeSource(statement);
							entriesByExportAllSource[sourceSerialize] ??= [];
							entriesByExportAllSource[sourceSerialize].push(statement);
							break;
						}
						case "ExportNamedDeclaration":
							if (statement.source !== null) {
								const sourceSerialize: string = serializeSource(statement);
								entriesByExportNamedSource[sourceSerialize] ??= [];
								entriesByExportNamedSource[sourceSerialize].push(statement);
							}
							break;
					}
				}
				for (const entryNodes of Object.values(entriesByExportAllSource)) {
					if (entryNodes.length > 1) {
						const entryNodesMeta: readonly string[] = entryNodes.map((node: Deno.lint.ExportAllDeclaration): string => {
							return `- ${getContextPositionStringFromNode(context, node)}`;
						});
						for (let index: number = 0; index < entryNodes.length; index += 1) {
							context.report({
								node: entryNodes[index],
								message: `Found multiple export all declarations with same source, possibly not intended and is mergeable.`,
								hint: `Other export all declarations with same source:\n${entryNodesMeta.toSpliced(index, 1).join("\n")}`
							});
						}
					}
				}
				for (const entryNodes of Object.values(entriesByExportNamedSource)) {
					if (entryNodes.length > 1) {
						const entryNodesMeta: readonly string[] = entryNodes.map((node: Deno.lint.ExportNamedDeclaration): string => {
							return `- ${getContextPositionStringFromNode(context, node)}`;
						});
						for (let index: number = 0; index < entryNodes.length; index += 1) {
							context.report({
								node: entryNodes[index],
								message: `Found multiple export named declarations with same source, possibly not intended and is mergeable.`,
								hint: `Other export named declarations with same source:\n${entryNodesMeta.toSpliced(index, 1).join("\n")}`
							});
						}
					}
				}
			},
			"Program:exit"(): void {
				// Check whether the source is exist in dynamic imports and static imports.
				for (const source of new Set<string>([
					...Object.keys(entriesByImportDynamicSource),
					...Object.keys(entriesByImportStaticSource)
				]).values()) {
					const entryNodesDynamic: readonly Deno.lint.ImportExpression[] = entriesByImportDynamicSource[source] ?? [];
					const entryNodesStatic: readonly Deno.lint.ImportDeclaration[] = entriesByImportStaticSource[source] ?? [];
					const entryNodesStaticMeta: readonly string[] = entryNodesStatic.map((node: Deno.lint.ImportDeclaration): string => {
						return `- ${getContextPositionStringFromNode(context, node)}`;
					});
					if (entryNodesDynamic.length + entryNodesStatic.length > 1) {
						if (entryNodesStatic.length > 0) {
							for (let index: number = 0; index < entryNodesDynamic.length; index += 1) {
								context.report({
									node: entryNodesDynamic[index],
									message: `Found import declaration(s) with same source, possibly not intended and is mergeable.`,
									hint: `Import declaration(s) with same source:\n${entryNodesStaticMeta.join("\n")}`
								});
							}
						}
						if (entryNodesStatic.length > 1) {
							for (let index: number = 0; index < entryNodesStatic.length; index += 1) {
								context.report({
									node: entryNodesStatic[index],
									message: `Found multiple import declarations with same source, possibly not intended and is mergeable.`,
									hint: `Other import declarations with same source:\n${entryNodesStaticMeta.toSpliced(index, 1).join("\n")}`
								});
							}
						}
					}
				}
			}
		};
	}
};
export const ruleData: RuleData = {
	identifier: "no-duplicate-imports",
	sets: [
		"recommended"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
