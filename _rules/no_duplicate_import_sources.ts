import {
	getVisualPositionStringFromNode,
	IdenticalGrouper,
	isNodeStringLiteral,
	NodeSerializer,
	type RuleData
} from "../_utility.ts";
const serializer: NodeSerializer = new NodeSerializer();
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		const grouperByImportSource: IdenticalGrouper<Deno.lint.ImportDeclaration | Deno.lint.ImportExpression> = new IdenticalGrouper<Deno.lint.ImportExpression>();
		return {
			ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
				// Collect and check at later.
				grouperByImportSource.add(serializer.forSource(node.source, node.attributes), node);
			},
			ImportExpression(node: Deno.lint.ImportExpression): void {
				// Collect and check at later.
				if (isNodeStringLiteral(node.source) && node.options === null) {
					grouperByImportSource.add(serializer.forSource(node.source, []), node);
				}
			},
			"Program:exit"(): void {
				// Check whether the source is exist in dynamic imports and static imports.
				for (const imports of grouperByImportSource.values()) {
					const importsDynamic: readonly Deno.lint.ImportExpression[] = imports.filter((node: Deno.lint.ImportDeclaration | Deno.lint.ImportExpression): node is Deno.lint.ImportExpression => {
						return (node.type === "ImportExpression");
					});
					const importsStatic: readonly Deno.lint.ImportDeclaration[] = imports.filter((node: Deno.lint.ImportDeclaration | Deno.lint.ImportExpression): node is Deno.lint.ImportDeclaration => {
						return (node.type === "ImportDeclaration");
					});
					if (importsStatic.length > 0) {
						const importsStaticMeta: readonly string[] = importsStatic.map((node: Deno.lint.ImportDeclaration): string => {
							return `- ${getVisualPositionStringFromNode(context, node)}`;
						});
						for (const importDynamic of importsDynamic) {
							context.report({
								node: importDynamic,
								message: `Found import declaration(s) with same source, possibly mergeable.`,
								hint: `Import declaration(s) with same source:\n${importsStaticMeta.join("\n")}`
							});
						}
						if (importsStatic.length > 1) {
							for (let index: number = 0; index < importsStatic.length; index += 1) {
								context.report({
									node: importsStatic[index],
									message: `Found multiple import declarations with same source, possibly mergeable.`,
									hint: `Other import declarations with same source:\n${importsStaticMeta.toSpliced(index, 1).join("\n")}`
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
	identifier: "no-duplicate-import-sources",
	sets: [
		"recommended"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
