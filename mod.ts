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
import { data as ruleNoPrompt } from "./rules/no_prompt.ts";
import { data as ruleNoTernaryNest } from "./rules/no_ternary_nest.ts";
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
	ruleNoPrompt,
	ruleNoTernaryNest,
	rulePreferASCIIIdentifier,
	rulePreferRegExpFlagUnicode,
	rulePreferStatementBlock,
	ruleStdOnJSR
];
export interface DenoLintRulesOptions {
	/**
	 * @default {true}
	 */
	"import-jsr"?: boolean | DenoLintRuleImportJSROptions;
	/**
	 * @default {true}
	 */
	"import-npm"?: boolean | DenoLintRuleImportNPMOptions;
	/**
	 * @default {false}
	 */
	"no-alert"?: boolean;
	/**
	 * @default {false}
	 */
	"no-confirm"?: boolean;
	/**
	 * @default {true}
	 */
	"no-enum"?: boolean;
	/**
	 * @default {true}
	 */
	"no-import-data"?: boolean;
	/**
	 * @default {true}
	 */
	"no-import-file"?: boolean;
	/**
	 * @default {true}
	 */
	"no-import-http"?: boolean;
	/**
	 * @default {false}
	 */
	"no-import-https"?: boolean;
	/**
	 * @default {false}
	 */
	"no-import-node"?: boolean;
	/**
	 * @default {false}
	 */
	"no-prompt"?: boolean;
	/**
	 * @default {false}
	 */
	"no-ternary-nest"?: boolean;
	/**
	 * @default {true}
	 */
	"prefer-ascii-identifier"?: boolean;
	/**
	 * @default {false}
	 */
	"prefer-regexp-flag-unicode"?: boolean;
	/**
	 * @default {true}
	 */
	"prefer-statement-block"?: boolean;
	/**
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
