import type { DenoLintRuleDataPre } from "../_utility.ts";
export interface DenoLintRuleRestrictModuleDataOptions {
	/**
	 * Whether to permit import modules via protocol `data:`.
	 * @default {false}
	 */
	fromProtocol?: boolean;
}
export interface DenoLintRuleRestrictModuleDenoLandOptions {
	/**
	 * Forbid these modules to import; Use `string` for exact match, or use `RegExp` for pattern match.
	 * 
	 * Module identifier can be one of these formats:
	 * 
	 * - `{Name}`
	 * - `{Name}@{Tag}`
	 * 
	 * If the module also match in the permits list, the module is permit instead.
	 */
	forbids?: readonly (string | RegExp)[];
	/**
	 * Permit these modules to import; Use `string` for exact match, or use `RegExp` for pattern match.
	 * 
	 * Module identifier can be one of these formats:
	 * 
	 * - `{Name}`
	 * - `{Name}@{Tag}`
	 * 
	 * If the module also match in the forbids list, the module is still permit.
	 */
	permits?: readonly (string | RegExp)[];
}
export interface DenoLintRuleRestrictModuleFileOptions {
	/**
	 * Whether to permit import modules via protocol `file:`.
	 * @default {false}
	 */
	fromProtocol?: boolean;
}
export interface DenoLintRuleRestrictModuleGitHubOptions {
	/**
	 * Forbid these modules to import; Use `string` for exact match, or use `RegExp` for pattern match.
	 * 
	 * Module identifier can be one of these formats:
	 * 
	 * - `{Owner}/{Repository}/refs/{Reference}`
	 * - `{Owner}/{Repository}/{Tag}`
	 * 
	 * If the module also match in the permits list, the module is permit instead.
	 */
	forbids?: readonly (string | RegExp)[];
	/**
	 * Permit these modules to import; Use `string` for exact match, or use `RegExp` for pattern match.
	 * 
	 * Module identifier can be one of these formats:
	 * 
	 * - `{Owner}/{Repository}/refs/{Reference}`
	 * - `{Owner}/{Repository}/{Tag}`
	 * 
	 * If the module also match in the forbids list, the module is still permit.
	 */
	permits?: readonly (string | RegExp)[];
}
export interface DenoLintRuleRestrictModuleHTTPOptions {
	/**
	 * Whether to permit import modules via protocol `http:`.
	 * @default {false}
	 */
	fromHTTP?: boolean;
	/**
	 * Whether to permit import modules via protocol `https:`.
	 * @default {true}
	 */
	fromHTTPS?: boolean;
	/**
	 * Forbid these domains to use for import via URL. Use `string` for exact match, or use `RegExp` for pattern match.
	 * 
	 * If the domain also match in the permits list, the domain is permit instead.
	 */
	forbids?: readonly (string | RegExp)[];
	/**
	 * Permit these domains to use for import via URL. Use `string` for exact match, or use `RegExp` for pattern match.
	 * 
	 * If the domain also match in the forbids list, the domain is still permit.
	 */
	permits?: readonly (string | RegExp)[];
}
export interface DenoLintRuleRestrictModuleJSROptions {
	/**
	 * Whether to permit import JSR modules via protocol `jsr:`.
	 * @default {true}
	 */
	fromProtocol?: boolean;
	/**
	 * Whether to permit import JSR modules via URL.
	 * @default {false}
	 */
	fromURL?: boolean;
	/**
	 * Forbid these modules to import; Use `string` for exact match, or use `RegExp` for pattern match.
	 * 
	 * Module identifier can be one of these formats:
	 * 
	 * - `@{Scope}/{Name}`
	 * - `@{Scope}/{Name}@{TagWithModifier}`
	 * 
	 * If the module also match in the permits list, the module is permit instead.
	 */
	forbids?: readonly (string | RegExp)[];
	/**
	 * Permit these modules to import; Use `string` for exact match, or use `RegExp` for pattern match.
	 * 
	 * Module identifier can be one of these formats:
	 * 
	 * - `@{Scope}/{Name}`
	 * - `@{Scope}/{Name}@{TagWithModifier}`
	 * 
	 * If the module also match in the forbids list, the module is still permit.
	 */
	permits?: readonly (string | RegExp)[];
}
export interface DenoLintRuleRestrictModuleNodeJSOptions {
	/**
	 * Whether to permit import NodeJS modules via protocol `node:`.
	 * @default {true}
	 */
	fromProtocol?: boolean;
}
export interface DenoLintRuleRestrictModuleNPMOptions {
	/**
	 * Whether to permit import npm modules via protocol `npm:`.
	 * @default {true}
	 */
	fromProtocol?: boolean;
	/**
	 * Whether to permit import npm modules via URL.
	 * @default {false}
	 */
	fromURL?: boolean;
	/**
	 * Forbid these modules to import; Use `string` for exact match, or use `RegExp` for pattern match.
	 * 
	 * Module identifier can be one of these formats:
	 * 
	 * - `{Name}`
	 * - `{Name}@{TagWithModifier}`
	 * - `@{Scope}/{Name}`
	 * - `@{Scope}/{Name}@{TagWithModifier}`
	 * 
	 * If the module also match in the permits list, the module is permit instead.
	 */
	forbids?: readonly (string | RegExp)[];
	/**
	 * Permit these modules to import; Use `string` for exact match, or use `RegExp` for pattern match.
	 * 
	 * Module identifier can be one of these formats:
	 * 
	 * - `{Name}`
	 * - `{Name}@{TagWithModifier}`
	 * - `@{Scope}/{Name}`
	 * - `@{Scope}/{Name}@{TagWithModifier}`
	 * 
	 * If the module also match in the forbids list, the module is still permit.
	 */
	permits?: readonly (string | RegExp)[];
}
export interface DenoLintRuleRestrictModuleOptions {
	/**
	 * **\[🚧 Work In Progress\]** Whether to recursively check the external modules whether fulfill the rule.
	 * 
	 * This can cause performance issues when enable lint on typing.
	 * @default {false}
	 */
	recursive?: boolean;
	/**
	 * Options for the module from protocol `data:`.
	 */
	data?: DenoLintRuleRestrictModuleDataOptions;
	/**
	 * **\[🚧 Work In Progress\]** Options for the module from Deno Land Module Registry.
	 */
	denoland?: DenoLintRuleRestrictModuleDenoLandOptions;
	/**
	 * Options for the module from protocol `file:`.
	 */
	file?: DenoLintRuleRestrictModuleFileOptions;
	/**
	 * **\[🚧 Work In Progress\]** Options for the module from GitHub.
	 */
	github?: DenoLintRuleRestrictModuleGitHubOptions;
	/**
	 * **\[🚧 Work In Progress\]** Options for the module from protocol `http:` and `https:`.
	 */
	http?: DenoLintRuleRestrictModuleHTTPOptions;
	/**
	 * **\[🚧 Work In Progress\]** Options for the module from JSR.
	 */
	jsr?: DenoLintRuleRestrictModuleJSROptions;
	/**
	 * Options for the module from protocol `node:`.
	 */
	node?: DenoLintRuleRestrictModuleNodeJSOptions;
	/**
	 * **\[🚧 Work In Progress\]** Options for the module from NPM.
	 */
	npm?: DenoLintRuleRestrictModuleNPMOptions;
}
/*
function checkItemPermission(item: string, forbids: readonly (string | RegExp)[] | undefined, permits: readonly (string | RegExp)[] | undefined): boolean {
	if (permits?.some((permit: string | RegExp): boolean => {
		if (permit instanceof RegExp) {
			return permit.test(item);
		}
		return (permit === item);
	})) {
		return true;
	}
	if (forbids?.some((forbid: string | RegExp): boolean => {
		if (forbid instanceof RegExp) {
			return forbid.test(item);
		}
		return (forbid === item);
	})) {
		return false;
	}
	return true;
}
*/
function checkModuleData(context: Deno.lint.RuleContext, node: Deno.lint.ExportAllDeclaration | Deno.lint.ExportNamedDeclaration | Deno.lint.ImportDeclaration | Deno.lint.ImportExpression, options: Required<DenoLintRuleRestrictModuleDataOptions>): void {
	if (!options.fromProtocol && (
		(node.type === "ExportAllDeclaration" && node.source.value.startsWith("data:")) ||
		(node.type === "ExportNamedDeclaration" && node.source !== null && node.source.value.startsWith("data:")) ||
		(node.type === "ImportDeclaration" && node.source.value.startsWith("data:")) ||
		(node.type === "ImportExpression" && node.source.type === "Literal" && typeof node.source.value === "string" && node.source.value.startsWith("data:"))
	)) {
		context.report({
			range: node.source!.range,
			message: `Import module with protocol \`data\` is hard to maintain and not secure.`
		});
	}
}
function checkModuleFile(context: Deno.lint.RuleContext, node: Deno.lint.ExportAllDeclaration | Deno.lint.ExportNamedDeclaration | Deno.lint.ImportDeclaration | Deno.lint.ImportExpression, options: Required<DenoLintRuleRestrictModuleFileOptions>): void {
	if (!options.fromProtocol && (
		(node.type === "ExportAllDeclaration" && node.source.value.startsWith("file:")) ||
		(node.type === "ExportNamedDeclaration" && node.source !== null && node.source.value.startsWith("file:")) ||
		(node.type === "ImportDeclaration" && node.source.value.startsWith("file:")) ||
		(node.type === "ImportExpression" && node.source.type === "Literal" && typeof node.source.value === "string" && node.source.value.startsWith("file:"))
	)) {
		context.report({
			range: node.source!.range,
			message: `Import module with protocol \`file\` is unnecessary.`
		});
	}
}
function checkModuleNodeJS(context: Deno.lint.RuleContext, node: Deno.lint.ExportAllDeclaration | Deno.lint.ExportNamedDeclaration | Deno.lint.ImportDeclaration | Deno.lint.ImportExpression, options: Required<DenoLintRuleRestrictModuleNodeJSOptions>): void {
	if (!options.fromProtocol && (
		(node.type === "ExportAllDeclaration" && node.source.value.startsWith("node:")) ||
		(node.type === "ExportNamedDeclaration" && node.source !== null && node.source.value.startsWith("node:")) ||
		(node.type === "ImportDeclaration" && node.source.value.startsWith("node:")) ||
		(node.type === "ImportExpression" && node.source.type === "Literal" && typeof node.source.value === "string" && node.source.value.startsWith("node:"))
	)) {
		context.report({
			range: node.source!.range,
			message: `Import module with protocol \`node\` is forbidden.`
		});
	}
}
function checkModule(context: Deno.lint.RuleContext, node: Deno.lint.ExportAllDeclaration | Deno.lint.ExportNamedDeclaration | Deno.lint.ImportDeclaration | Deno.lint.ImportExpression, options: Required<DenoLintRuleRestrictModuleOptions>): void {
	checkModuleData(context, node, options.data as Required<DenoLintRuleRestrictModuleDataOptions>);
	checkModuleFile(context, node, options.file as Required<DenoLintRuleRestrictModuleFileOptions>);
	checkModuleNodeJS(context, node, options.file as Required<DenoLintRuleRestrictModuleNodeJSOptions>);
}
export const data: DenoLintRuleDataPre<DenoLintRuleRestrictModuleOptions> = {
	identifier: "restrict-module",
	recommended: true,
	context(options: DenoLintRuleRestrictModuleOptions = {}): Deno.lint.Rule {
		const optionsFmt: DenoLintRuleRestrictModuleOptions = structuredClone(options);
		optionsFmt.data ??= {};
		optionsFmt.data.fromProtocol ??= false;
		optionsFmt.denoland ??= {};
		optionsFmt.file ??= {};
		optionsFmt.file.fromProtocol ??= false;
		optionsFmt.github ??= {};
		optionsFmt.http ??= {};
		optionsFmt.jsr ??= {};
		optionsFmt.node ??= {};
		optionsFmt.node.fromProtocol ??= true;
		optionsFmt.npm ??= {};
		optionsFmt.recursive ??= false;
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ExportAllDeclaration(node: Deno.lint.ExportAllDeclaration): void {
						checkModule(context, node, optionsFmt as Required<DenoLintRuleRestrictModuleOptions>);
					},
					ExportNamedDeclaration(node: Deno.lint.ExportNamedDeclaration): void {
						checkModule(context, node, optionsFmt as Required<DenoLintRuleRestrictModuleOptions>);
					},
					ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
						checkModule(context, node, optionsFmt as Required<DenoLintRuleRestrictModuleOptions>);
					},
					ImportExpression(node: Deno.lint.ImportExpression): void {
						checkModule(context, node, optionsFmt as Required<DenoLintRuleRestrictModuleOptions>);
					}
				};
			}
		};
	}
};
