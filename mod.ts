import {
	constructDenoLintPlugin,
	type DenoLintRuleData,
	type DenoLintRuleDataPre
} from "./_template.ts";
import {
	data as ruleMaxParams,
	type DenoLintRuleMaxParamsOptions
} from "./_rules/max_params.ts";
import { data as ruleNoAlert } from "./_rules/no_alert.ts";
import { data as ruleNoConfirm } from "./_rules/no_confirm.ts";
import { data as ruleNoEnum } from "./_rules/no_enum.ts";
import { data as ruleNoImportData } from "./_rules/no_import_data.ts";
import { data as ruleNoImportFile } from "./_rules/no_import_file.ts";
import { data as ruleNoImportHTTP } from "./_rules/no_import_http.ts";
import { data as ruleNoImportHTTPS } from "./_rules/no_import_https.ts";
import {
	data as ruleNoImportJSR,
	type DenoLintRuleNoImportJSROptions
} from "./_rules/no_import_jsr.ts";
import { data as ruleNoImportNode } from "./_rules/no_import_node.ts";
import {
	data as ruleNoImportNPM,
	type DenoLintRuleNoImportNPMOptions
} from "./_rules/no_import_npm.ts";
import { data as ruleNoNaN } from "./_rules/no_nan.ts";
import { data as ruleNoPrompt } from "./_rules/no_prompt.ts";
import { data as ruleNoTernaryNest } from "./_rules/no_ternary_nest.ts";
import { data as ruleNoUnsafeNumber } from "./_rules/no_unsafe_number.ts";
import { data as ruleNoUseStrict } from "./_rules/no_use_strict.ts";
import { data as ruleNoUselessClassConstructor } from "./_rules/no_useless_class_constructor.ts";
import { data as ruleNoUselessClassStaticBlock } from "./_rules/no_useless_class_static_block.ts";
import { data as ruleNoUselessExport } from "./_rules/no_useless_export.ts";
import { data as ruleNoUselessExpression } from "./_rules/no_useless_expression.ts";
import { data as ruleNoUselessTernary } from "./_rules/no_useless_ternary.ts";
import { data as ruleNoUselessTry } from "./_rules/no_useless_try.ts";
import { data as rulePreferASCIIIdentifier } from "./_rules/prefer_ascii_identifier.ts";
import {
	data as rulePreferRegExpFlagUnicode,
	type DenoLintRulePreferRegExpFlagUnicodeOptions
} from "./_rules/prefer_regexp_flag_unicode.ts";
import { data as rulePreferStatementBlock } from "./_rules/prefer_statement_block.ts";
import { data as rulePreferSymbolDescription } from "./_rules/prefer_symbol_description.ts";
import { data as ruleStdOnJSR } from "./_rules/std_on_jsr.ts";
//deno-lint-ignore no-explicit-any
const rules: readonly DenoLintRuleDataPre<any>[] = [
	ruleMaxParams,
	ruleNoAlert,
	ruleNoConfirm,
	ruleNoEnum,
	ruleNoImportData,
	ruleNoImportFile,
	ruleNoImportHTTP,
	ruleNoImportHTTPS,
	ruleNoImportJSR,
	ruleNoImportNode,
	ruleNoImportNPM,
	ruleNoNaN,
	ruleNoPrompt,
	ruleNoTernaryNest,
	ruleNoUnsafeNumber,
	ruleNoUseStrict,
	ruleNoUselessClassConstructor,
	ruleNoUselessClassStaticBlock,
	ruleNoUselessExport,
	ruleNoUselessExpression,
	ruleNoUselessTernary,
	ruleNoUselessTry,
	rulePreferASCIIIdentifier,
	rulePreferRegExpFlagUnicode,
	rulePreferStatementBlock,
	rulePreferSymbolDescription,
	ruleStdOnJSR
];
export interface DenoLintRulesOptions {
	/**
	 * Restrict maximum number of parameters per function/method definition, similar to the ESLint rule {@linkcode https://eslint.org/docs/latest/rules/max-params max-params} and TypeScript ESLint rule {@linkcode https://typescript-eslint.io/rules/max-params/ max-params}.
	 * @default {false}
	 */
	"max-params"?: boolean | DenoLintRuleMaxParamsOptions;
	/**
	 * Forbid {@linkcode https://developer.mozilla.org/en-US/docs/Web/API/Window/alert alert}, similar to the ESLint rule {@linkcode https://eslint.org/docs/latest/rules/no-alert no-alert}.
	 * @default {false}
	 */
	"no-alert"?: boolean;
	/**
	 * Forbid {@linkcode https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm confirm}, similar to the ESLint rule {@linkcode https://eslint.org/docs/latest/rules/no-alert no-alert}.
	 * @default {false}
	 */
	"no-confirm"?: boolean;
	/**
	 * Forbid {@linkcode https://www.typescriptlang.org/docs/handbook/enums.html enum}.
	 * @default {true}
	 */
	"no-enum"?: boolean;
	/**
	 * Forbid import module via protocol `data:`.
	 * @default {true}
	 */
	"no-import-data"?: boolean;
	/**
	 * Forbid import module via protocol `file:`.
	 * @default {true}
	 */
	"no-import-file"?: boolean;
	/**
	 * Forbid import module via protocol `http:`.
	 * @default {true}
	 */
	"no-import-http"?: boolean;
	/**
	 * Forbid import module via protocol `https:`.
	 * @default {false}
	 */
	"no-import-https"?: boolean;
	/**
	 * Forbid import JSR module. By default, only forbid import JSR module via URL.
	 * @default {true}
	 */
	"no-import-jsr"?: boolean | DenoLintRuleNoImportJSROptions;
	/**
	 * Forbid import module via protocol `node:`.
	 * @default {false}
	 */
	"no-import-node"?: boolean;
	/**
	 * Forbid import NPM module.
	 * @default {false}
	 */
	"no-import-npm"?: boolean | DenoLintRuleNoImportNPMOptions;
	/**
	 * Forbid {@linkcode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN NaN}.
	 * @default {true}
	 */
	"no-nan"?: boolean;
	/**
	 * Forbid {@linkcode https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt prompt}, similar to the ESLint rule {@linkcode https://eslint.org/docs/latest/rules/no-alert no-alert}.
	 * @default {false}
	 */
	"no-prompt"?: boolean;
	/**
	 * Forbid nested {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator ternary expression}, similar to the ESLint rule {@linkcode https://eslint.org/docs/latest/rules/no-nested-ternary no-nested-ternary}.
	 * @default {false}
	 */
	"no-ternary-nest"?: boolean;
	/**
	 * Forbid unsafe number.
	 * @default {true}
	 */
	"no-unsafe-number"?: boolean;
	/**
	 * Forbid use of {@linkcode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode use strict} directive as ECMAScript modules always have strict mode semantics, similar to the ESLint rule {@linkcode https://eslint.org/docs/latest/rules/strict strict}.
	 * @default {true}
	 */
	"no-use-strict"?: boolean;
	/**
	 * Forbid useless {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor class constructor}, similar to the ESLint rule {@linkcode https://eslint.org/docs/latest/rules/no-useless-constructor no-useless-constructor}.
	 * @default {true}
	 */
	"no-useless-class-constructor"?: boolean;
	/**
	 * Forbid useless {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Static_initialization_blocks class static (initialization) block}, similar to the ESLint rule {@linkcode https://eslint.org/docs/latest/rules/no-empty-static-block no-empty-static-block}.
	 * @default {true}
	 */
	"no-useless-class-static-block"?: boolean;
	/**
	 * Forbid useless {@linkcode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export export}, similar to the TypeScript ESLint rule {@linkcode https://typescript-eslint.io/rules/no-useless-empty-export/ no-useless-empty-export}.
	 * @default {true}
	 */
	"no-useless-export"?: boolean;
	/**
	 * Forbid useless expression, similar to the ESLint rule {@linkcode https://eslint.org/docs/latest/rules/no-unused-expressions no-unused-expressions}.
	 * @default {true}
	 */
	"no-useless-expression"?: boolean;
	/**
	 * Forbid useless {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator ternary expression}, similar to the ESLint rule {@linkcode https://eslint.org/docs/latest/rules/no-unneeded-ternary no-unneeded-ternary}.
	 * @default {true}
	 */
	"no-useless-ternary"?: boolean;
	/**
	 * Forbid useless {@linkcode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch try-catch-finally}, similar to the ESLint rule {@linkcode https://eslint.org/docs/latest/rules/no-useless-catch no-useless-catch}.
	 * @default {true}
	 */
	"no-useless-try"?: boolean;
	/**
	 * Prefer ASCII identifier, an alternative of the Deno lint rule {@linkcode https://docs.deno.com/lint/rules/prefer-ascii/ prefer-ascii} which only enforce on the identifier.
	 * @default {true}
	 */
	"prefer-ascii-identifier"?: boolean;
	/**
	 * Prefer the regular expression is contain Unicode flag (`u` or `v`), similar to the ESLint rule {@linkcode https://eslint.org/docs/latest/rules/require-unicode-regexp require-unicode-regexp}.
	 * @default {false}
	 */
	"prefer-regexp-flag-unicode"?: boolean | DenoLintRulePreferRegExpFlagUnicodeOptions;
	/**
	 * Prefer curly braces around statement blocks, similar to the ESLint rule {@linkcode https://eslint.org/docs/latest/rules/curly curly}.
	 * @default {true}
	 */
	"prefer-statement-block"?: boolean;
	/**
	 * Prefer {@linkcode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/Symbol Symbol} to have a description, similar to the ESLint rule {@linkcode https://eslint.org/docs/latest/rules/symbol-description symbol-description}.
	 * @default {false}
	 */
	"prefer-symbol-description"?: boolean;
	/**
	 * Enforce import Deno Standard Library (std) via JSR.
	 * @default {true}
	 */
	"std-on-jsr"?: boolean;
}
export function configureDenoLintPlugin(options: DenoLintRulesOptions = {}): Deno.lint.Plugin {
	const result: DenoLintRuleData[] = [];
	for (const {
		context,
		identifier,
		recommended = false
	} of rules) {
		//@ts-ignore Lazy type.
		const option: unknown = options[identifier];
		if (typeof option === "boolean") {
			if (option) {
				result.push({
					context: context(),
					identifier
				});
			}
		} else if (typeof option === "undefined") {
			if (recommended) {
				result.push({
					context: context(),
					identifier
				});
			}
		} else {
			result.push({
				//@ts-ignore Lazy type.
				context: context(option as unknown),
				identifier
			});
		}
	}
	return constructDenoLintPlugin(result);
}
