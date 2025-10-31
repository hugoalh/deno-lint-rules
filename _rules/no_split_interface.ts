import {
	getVisualPositionStringFromNode,
	IdenticalGrouper,
	type RuleData
} from "../_utility.ts";
function ruleAssertor(context: Deno.lint.RuleContext, statements: readonly Deno.lint.Statement[]): void {
	const grouperByInterfaceIdentifier: IdenticalGrouper<Deno.lint.TSInterfaceDeclaration> = new IdenticalGrouper<Deno.lint.TSInterfaceDeclaration>();
	for (const statement of statements) {
		if (statement.type === "ExportNamedDeclaration" && statement.declaration?.type === "TSInterfaceDeclaration") {
			// export interface
			grouperByInterfaceIdentifier.add(statement.declaration.id.name, statement.declaration);
		} else if (statement.type === "TSInterfaceDeclaration") {
			// interface
			grouperByInterfaceIdentifier.add(statement.id.name, statement);
		}
	}
	for (const [
		identifier,
		interfaces
	] of grouperByInterfaceIdentifier.entries()) {
		if (interfaces.length > 1) {
			const ruleMessage: string = `Found multiple interface \`${identifier}\`, possibly mergeable.`;
			const interfacesMeta: readonly string[] = interfaces.map((node: Deno.lint.TSInterfaceDeclaration): string => {
				return `- ${getVisualPositionStringFromNode(context, node)}`;
			});
			for (let index: number = 0; index < interfaces.length; index += 1) {
				const report: Deno.lint.ReportData = {
					node: interfaces[index],
					message: ruleMessage,
					hint: `Other interfaces with same identifier:\n${interfacesMeta.toSpliced(index, 1).join("\n")}`
				};
				if (index === 0) {
					const interfaceRemain: Deno.lint.TSInterfaceDeclaration = interfaces[0];
					const interfacesRemove: readonly Deno.lint.TSInterfaceDeclaration[] = interfaces.slice(1);
					const replacementText: string = interfacesRemove.map((node: Deno.lint.TSInterfaceDeclaration): string => {
						return context.sourceCode.getText(node.body).slice(1, - 1);
					}).join("");
					report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
						return [
							...interfacesRemove.map((interfaceRemove: Deno.lint.TSInterfaceDeclaration): Deno.lint.Fix => {
								return fixer.remove(interfaceRemove);
							}).reverse(),
							fixer.insertTextAfterRange([interfaceRemain.range[0], interfaceRemain.range[1] - 1], replacementText)
						];
					};
				}
				context.report(report);
			}
		}
	}
}
export const ruleData: RuleData = {
	identifier: "no-split-interface",
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
};
