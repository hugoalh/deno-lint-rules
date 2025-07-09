import {
	IdenticalGrouper,
	type RuleData
} from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
				const grouperByImportIdentifier: IdenticalGrouper<Deno.lint.ImportSpecifier> = new IdenticalGrouper<Deno.lint.ImportSpecifier>();
				let importDefaultIdentifier: Deno.lint.ImportDefaultSpecifier | undefined;
				for (const specifier of node.specifiers) {
					switch (specifier.type) {
						case "ImportDefaultSpecifier":
							importDefaultIdentifier = specifier;
							break;
						case "ImportSpecifier": {
							const name: Deno.lint.Identifier | Deno.lint.StringLiteral = specifier.imported;
							grouperByImportIdentifier.add((name.type === "Literal") ? name.value : name.name, specifier);
							break;
						}
					}
				}
				for (const [
					name,
					identifiers
				] of grouperByImportIdentifier.entries()) {
					if (typeof importDefaultIdentifier !== "undefined" && name === "default") {
						const identifiersMix: readonly (Deno.lint.ImportDefaultSpecifier | Deno.lint.ImportSpecifier)[] = [importDefaultIdentifier, ...identifiers];
						const identifiersMixMeta: readonly string[] = identifiersMix.map((node: Deno.lint.ImportDefaultSpecifier | Deno.lint.ImportSpecifier): string => {
							return `\`${node.local.name}\``;
						});
						for (let index: number = 0; index < identifiersMix.length; index += 1) {
							context.report({
								node: identifiersMix[index],
								message: `Found default import with multiple local identifiers, possibly mergeable.`,
								hint: `Other local identifiers with same default import: ${identifiersMixMeta.toSpliced(index, 1).join(", ")}`
							});
						}
					} else if (identifiers.length > 1) {
						const ruleMessage: string = `Found import \`${name}\` with multiple local identifiers, possibly mergeable.`;
						const identifiersMeta: readonly string[] = identifiers.map((node: Deno.lint.ImportSpecifier): string => {
							return `\`${node.local.name}\``;
						});
						for (let index: number = 0; index < identifiers.length; index += 1) {
							context.report({
								node: identifiers[index],
								message: ruleMessage,
								hint: `Other local identifiers with same import: ${identifiersMeta.toSpliced(index, 1).join(", ")}`
							});
						}
					}
				}
			}
		};
	}
};
export const ruleData: RuleData = {
	identifier: "no-duplicate-import-identifiers",
	sets: [
		"recommended"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
