import {
	getContextPositionStringFromNode,
	IdenticalGrouper,
	serializeSource,
	type RuleData
} from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			Program(node: Deno.lint.Program): void {
				const grouperByExportNamedSource: IdenticalGrouper<Deno.lint.ExportNamedDeclaration> = new IdenticalGrouper<Deno.lint.ExportNamedDeclaration>();
				for (const statement of node.body) {
					if (statement.type === "ExportNamedDeclaration" && statement.source !== null) {
						grouperByExportNamedSource.add(serializeSource(statement.source, statement.attributes), statement);
					}
				}
				for (const exportsNamed of grouperByExportNamedSource.values()) {
					if (exportsNamed.length > 1) {
						const exportsNamedMeta: readonly string[] = exportsNamed.map((node: Deno.lint.ExportNamedDeclaration): string => {
							return `- ${getContextPositionStringFromNode(context, node)}`;
						});
						for (let index: number = 0; index < exportsNamed.length; index += 1) {
							context.report({
								node: exportsNamed[index],
								message: `Found multiple export named declarations with same source, possibly mergeable.`,
								hint: `Other export named declarations with same source:\n${exportsNamedMeta.toSpliced(index, 1).join("\n")}`
							});
						}
					}
				}
			}
		};
	}
};
export const ruleData: RuleData = {
	identifier: "no-duplicate-export-sources",
	sets: [
		"recommended"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
