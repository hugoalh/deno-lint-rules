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
import { data as ruleNoImportData } from "./rules/no_import_data.ts";
import { data as ruleNoImportFile } from "./rules/no_import_file.ts";
import { data as ruleNoImportHTTP } from "./rules/no_import_http.ts";
import { data as ruleNoImportHTTPS } from "./rules/no_import_https.ts";
import { data as ruleNoImportNode } from "./rules/no_import_node.ts";
import { data as rulePreferASCIIIdentifier } from "./rules/prefer_ascii_identifier.ts";
import { data as rulePreferRegExpFlagUnicode } from "./rules/prefer_regexp_flag_unicode.ts";
import { data as ruleStdOnJSR } from "./rules/std_on_jsr.ts";
//deno-lint-ignore no-explicit-any
const rules: readonly DenoLintRuleDataPre<any>[] = [
	ruleImportJSR,
	ruleImportNPM,
	ruleNoImportData,
	ruleNoImportFile,
	ruleNoImportHTTP,
	ruleNoImportHTTPS,
	ruleNoImportNode,
	rulePreferASCIIIdentifier,
	rulePreferRegExpFlagUnicode,
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
