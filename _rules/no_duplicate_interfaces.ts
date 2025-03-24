import type { DenoLintRuleDataPre } from "../_template.ts";
import {
	getContextPosition,
	type ContextPosition
} from "../_utility.ts";
function ruleAssertor(context: Deno.lint.RuleContext, statements: readonly Deno.lint.Statement[]): void {
	// const entriesContext: Record<string, Deno.lint.TSInterfaceDeclaration[]> = {};
	const entriesIdentifier: Record<string, Deno.lint.TSInterfaceDeclaration[]> = {};
	function addEntry(node: Deno.lint.TSInterfaceDeclaration): void {
		const identifier: string = node.id.name;
		entriesIdentifier[identifier] ??= [];
		entriesIdentifier[identifier].push(node);
	}
	for (const statement of statements) {
		if (statement.type === "ExportNamedDeclaration" && statement.declaration?.type === "TSInterfaceDeclaration") {
			// export type
			addEntry(statement.declaration);
		} else if (statement.type === "TSInterfaceDeclaration") {
			// type
			addEntry(statement);
		}
	}
	for (const [identifier, entryNodes] of Object.entries(entriesIdentifier)) {
		if (entryNodes.length > 1) {
			const message = `Interface \`${identifier}\` is duplicated ${entryNodes.length - 1} times. Duplicate \`interface\`s are forbidden.`;
			const entryNodesPosition: readonly string[] = entryNodes.map((node: Deno.lint.TSInterfaceDeclaration): string => {
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
					message,
					hint: `Position of other interfaces with same identifier:\n${entryNodesPosition.toSpliced(index, 1).join("\n")}`
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
	identifier: "no-duplicate-interfaces",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
