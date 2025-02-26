import {
	constructDenoLintPlugin,
	type DenoLintRuleData,
	type DenoLintRuleDataPre
} from "./_utility.ts";
import { data as ruleNoImportProtocolHTTP } from "./rules/no_import_protocol_http.ts";
import { data as ruleNoImportProtocolHTTPS } from "./rules/no_import_protocol_https.ts";
import { data as ruleNoImportProtocolJSR } from "./rules/no_import_protocol_jsr.ts";
import { data as ruleNoImportProtocolNPM } from "./rules/no_import_protocol_npm.ts";
import { data as rulePreferASCIIIdentifier } from "./rules/prefer_ascii_identifier.ts";
import {
	data as ruleRestrictModule,
	type DenoLintRuleRestrictModuleOptions
} from "./rules/restrict_module.ts";
import { data as ruleStdOnJSR } from "./rules/std_on_jsr.ts";
//deno-lint-ignore no-explicit-any
const rules: readonly DenoLintRuleDataPre<any>[] = [
	ruleNoImportProtocolHTTP,
	ruleNoImportProtocolHTTPS,
	ruleNoImportProtocolJSR,
	ruleNoImportProtocolNPM,
	rulePreferASCIIIdentifier,
	ruleRestrictModule,
	ruleStdOnJSR
];
export interface DenoLintRulesOptions {
	/**
	 * @default {true}
	 */
	"no-import-protocol-http"?: boolean;
	/**
	 * @default {false}
	 */
	"no-import-protocol-https"?: boolean;
	/**
	 * @default {false}
	 */
	"no-import-protocol-jsr"?: boolean;
	/**
	 * @default {false}
	 */
	"no-import-protocol-npm"?: boolean;
	/**
	 * @default {true}
	 */
	"prefer-ascii-identifier"?: boolean;
	/**
	 * @default {true}
	 */
	"restrict-module"?: boolean | DenoLintRuleRestrictModuleOptions;
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
