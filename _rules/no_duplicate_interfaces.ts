import {
	getContextPositionStringFromNode,
	serializeNode,
	type RuleData
} from "../_utility.ts";
function ruleAssertor(context: Deno.lint.RuleContext, statements: readonly Deno.lint.Statement[]): void {
	const entriesByContext: Record<string, Deno.lint.TSInterfaceDeclaration[]> = {};
	const entriesByIdentifier: Record<string, Deno.lint.TSInterfaceDeclaration[]> = {};
	function addEntry(node: Deno.lint.TSInterfaceDeclaration): void {
		const contextBodySerialize: string = serializeNode(node.body);
		const contextExtendsSerialize: string = node.extends.map((extend: Deno.lint.TSInterfaceHeritage): string => {
			return serializeNode(extend);
		}).join(" & ");
		const contextSerialize: string = (node.extends.length > 0) ? `${contextExtendsSerialize} & ${contextBodySerialize}` : contextBodySerialize;
		entriesByContext[contextSerialize] ??= [];
		entriesByContext[contextSerialize].push(node);
		const identifier: string = node.id.name;
		entriesByIdentifier[identifier] ??= [];
		entriesByIdentifier[identifier].push(node);
	}
	for (const statement of statements) {
		if (statement.type === "ExportNamedDeclaration" && statement.declaration?.type === "TSInterfaceDeclaration") {
			// export interface
			addEntry(statement.declaration);
		} else if (statement.type === "TSInterfaceDeclaration") {
			// interface
			addEntry(statement);
		}
	}
	for (const entryNodes of Object.values(entriesByContext)) {
		if (entryNodes.length > 1) {
			const entryNodesMeta: readonly string[] = entryNodes.map((entryNode: Deno.lint.TSInterfaceDeclaration): string => {
				return `- \`${entryNode.id.name}\`; ${getContextPositionStringFromNode(context, entryNode)}`;
			});
			for (let index: number = 0; index < entryNodes.length; index += 1) {
				context.report({
					node: entryNodes[index],
					message: `Found multiple interfaces with same context, possibly not intended and is mergeable.`,
					hint: `Other interfaces with same context:\n${entryNodesMeta.toSpliced(index, 1).join("\n")}`
				});
			}
		}
	}
	for (const [
		identifier,
		entryNodes
	] of Object.entries(entriesByIdentifier)) {
		if (entryNodes.length > 1) {
			const ruleMessageIdentifier = `Found multiple interface \`${identifier}\`, possibly not intended and is mergeable.`;
			const entryNodesMeta: readonly string[] = entryNodes.map((node: Deno.lint.TSInterfaceDeclaration): string => {
				return `- ${getContextPositionStringFromNode(context, node)}`;
			});
			for (let index: number = 0; index < entryNodes.length; index += 1) {
				context.report({
					node: entryNodes[index],
					message: ruleMessageIdentifier,
					hint: `Other interfaces with same identifier:\n${entryNodesMeta.toSpliced(index, 1).join("\n")}`
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
export const ruleData: RuleData = {
	identifier: "no-duplicate-interfaces",
	sets: [
		"recommended"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
