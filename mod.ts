import {
	constructDenoLintPlugin,
	type DenoLintRuleData,
	type DenoLintRuleDataPre
} from "./_utility.ts";
import {
	data as ruleImportJSR,
	type DenoLintRuleImportJSROptions
} from "./rules/import_jsr.ts";
import {
	data as ruleImportNPM,
	type DenoLintRuleImportNPMOptions
} from "./rules/import_npm.ts";
import { data as ruleNoAlert } from "./rules/no_alert.ts";
import { data as ruleNoConfirm } from "./rules/no_confirm.ts";
import { data as ruleNoEnum } from "./rules/no_enum.ts";
import { data as ruleNoImportData } from "./rules/no_import_data.ts";
import { data as ruleNoImportFile } from "./rules/no_import_file.ts";
import { data as ruleNoImportHTTP } from "./rules/no_import_http.ts";
import { data as ruleNoImportHTTPS } from "./rules/no_import_https.ts";
import { data as ruleNoImportNode } from "./rules/no_import_node.ts";
import { data as ruleNoNaN } from "./rules/no_nan.ts";
import { data as ruleNoPrompt } from "./rules/no_prompt.ts";
import { data as ruleNoTernaryNest } from "./rules/no_ternary_nest.ts";
import { data as ruleNoUnsafeNumber } from "./rules/no_unsafe_number.ts";
import { data as rulePreferASCIIIdentifier } from "./rules/prefer_ascii_identifier.ts";
import { data as rulePreferRegExpFlagUnicode } from "./rules/prefer_regexp_flag_unicode.ts";
import { data as rulePreferStatementBlock } from "./rules/prefer_statement_block.ts";
import { data as ruleStdOnJSR } from "./rules/std_on_jsr.ts";
//deno-lint-ignore no-explicit-any
const rules: readonly DenoLintRuleDataPre<any>[] = [
	ruleImportJSR,
	ruleImportNPM,
	ruleNoAlert,
	ruleNoConfirm,
	ruleNoEnum,
	ruleNoImportData,
	ruleNoImportFile,
	ruleNoImportHTTP,
	ruleNoImportHTTPS,
	ruleNoImportNode,
	ruleNoNaN,
	ruleNoPrompt,
	ruleNoTernaryNest,
	ruleNoUnsafeNumber,
	rulePreferASCIIIdentifier,
	rulePreferRegExpFlagUnicode,
	rulePreferStatementBlock,
	ruleStdOnJSR
];
export interface DenoLintRulesOptions {
	/**
	 * Control import JSR module behaviours.
	 * @default {true}
	 */
	"import-jsr"?: boolean | DenoLintRuleImportJSROptions;
	/**
	 * Control import NPM module behaviours.
	 * @default {true}
	 */
	"import-npm"?: boolean | DenoLintRuleImportNPMOptions;
	/**
	 * Forbid {@linkcode https://developer.mozilla.org/en-US/docs/Web/API/Window/alert alert}.
	 * @default {false}
	 */
	"no-alert"?: boolean;
	/**
	 * Forbid {@linkcode https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm confirm}.
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
	 * Forbid import module via protocol `node:`.
	 * @default {false}
	 */
	"no-import-node"?: boolean;
	/**
	 * Forbid {@linkcode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN NaN}.
	 * @default {true}
	 */
	"no-nan"?: boolean;
	/**
	 * Forbid {@linkcode https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt prompt}.
	 * @default {false}
	 */
	"no-prompt"?: boolean;
	/**
	 * Forbid nested {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator ternary expression}.
	 * @default {false}
	 */
	"no-ternary-nest"?: boolean;
	/**
	 * Forbid unsafe number.
	 * @default {true}
	 */
	"no-unsafe-number"?: boolean;
	/**
	 * Prefer ASCII identifier, an alternative of the Deno lint official rule {@linkcode https://docs.deno.com/lint/rules/prefer-ascii/ prefer-ascii} which only enforce on the identifier.
	 * @default {true}
	 */
	"prefer-ascii-identifier"?: boolean;
	/**
	 * Prefer the regular expression is contain Unicode flag (`u` or `v`), similar to the ESLint official rule {@linkcode https://eslint.org/docs/latest/rules/require-unicode-regexp require-unicode-regexp}.
	 * @default {false}
	 */
	"prefer-regexp-flag-unicode"?: boolean;
	/**
	 * Prefer not to omit curly braces around blocks, similar to the ESLint official rule {@linkcode https://eslint.org/docs/latest/rules/curly curly}.
	 * @default {true}
	 */
	"prefer-statement-block"?: boolean;
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
