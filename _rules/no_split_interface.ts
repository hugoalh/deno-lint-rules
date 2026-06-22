import {
	getNodeCommentsFromRange,
	Grouper,
	listFormatterConjunction,
	NodeVisualPosition,
	type RuleConstructContext
} from "../_utility.ts";
function ruleAssertor(context: Deno.lint.RuleContext, statements: readonly Deno.lint.Statement[]): void {
	const grouper: Grouper<Deno.lint.TSInterfaceDeclaration> = new Grouper<Deno.lint.TSInterfaceDeclaration>();
	for (const statement of statements) {
		if (statement.type === "ExportNamedDeclaration" && statement.declaration?.type === "TSInterfaceDeclaration") {
			// export interface
			grouper.add(statement.declaration, statement.declaration.id.name);
		} else if (statement.type === "TSInterfaceDeclaration") {
			// interface
			grouper.add(statement, statement.id.name);
		}
	}
	for (const [
		identifier,
		interfaces
	] of grouper.entries()) {
		if (interfaces.length > 1) {
			const ruleMessage: string = `Found multiple interface \`${identifier}\`, possibly mergeable.`;
			const interfacesPosition: readonly string[] = interfaces.map((node: Deno.lint.TSInterfaceDeclaration): string => {
				return new NodeVisualPosition(context, node).toString();
			});
			const fixerDispatch: boolean = interfaces.slice(1).every((node: Deno.lint.TSInterfaceDeclaration): boolean => {
				return (getNodeCommentsFromRange(context, [node.range[0], node.body.range[0]]).length === 0);
			});
			for (let index: number = 0; index < interfaces.length; index += 1) {
				const report: Deno.lint.ReportData = {
					node: interfaces[index],
					message: ruleMessage,
					hint: `Other interfaces with same identifier locate at position ${listFormatterConjunction.format(interfacesPosition.toSpliced(index, 1))}.`
				};
				if (index === 0 && fixerDispatch) {
					const [
						interfaceRemain,
						...interfacesRemove
					]: Deno.lint.TSInterfaceDeclaration[] = interfaces;
					const replacementText: string = interfacesRemove.map((node: Deno.lint.TSInterfaceDeclaration): string => {
						return context.sourceCode.getText(node.body).slice(1, - 1);
					}).join("");
					report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
						return [
							...interfacesRemove.map((node: Deno.lint.TSInterfaceDeclaration): Deno.lint.Fix => {
								return fixer.remove(node);
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
export default {
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
} satisfies RuleConstructContext as RuleConstructContext;
