import {
	constructDenoLintPlugin,
	type DenoLintRule,
	type DenoLintRulePre
} from "./_utility.ts";
import { data as ruleNoImportProtocolBun } from "./rules/no_import_protocol_bun.ts";
import { data as ruleNoImportProtocolData } from "./rules/no_import_protocol_data.ts";
import { data as ruleNoImportProtocolFile } from "./rules/no_import_protocol_file.ts";
import { data as ruleNoImportProtocolHTTP } from "./rules/no_import_protocol_http.ts";
import { data as ruleNoImportProtocolHTTPS } from "./rules/no_import_protocol_https.ts";
import { data as ruleNoImportProtocolJSR } from "./rules/no_import_protocol_jsr.ts";
import { data as ruleNoImportProtocolNode } from "./rules/no_import_protocol_node.ts";
import { data as ruleNoImportProtocolNPM } from "./rules/no_import_protocol_npm.ts";
import { data as ruleStandardIdentifierName } from "./rules/standard_identifier_name.ts";
import { data as ruleStdOnJSR } from "./rules/std_on_jsr.ts";
const rules: readonly DenoLintRulePre[] = [
	ruleNoImportProtocolBun,
	ruleNoImportProtocolData,
	ruleNoImportProtocolFile,
	ruleNoImportProtocolHTTP,
	ruleNoImportProtocolHTTPS,
	ruleNoImportProtocolJSR,
	ruleNoImportProtocolNode,
	ruleNoImportProtocolNPM,
	ruleStandardIdentifierName,
	ruleStdOnJSR
];
export interface DenoLintRulesOptions {
	/**
	 * @default {true}
	 */
	"no-import-protocol-bun"?: boolean;
	/**
	 * @default {true}
	 */
	"no-import-protocol-data"?: boolean;
	/**
	 * @default {true}
	 */
	"no-import-protocol-file"?: boolean;
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
	"no-import-protocol-node"?: boolean;
	/**
	 * @default {false}
	 */
	"no-import-protocol-npm"?: boolean;
	/**
	 * @default {true}
	 */
	"standard-identifier-name"?: boolean;
	/**
	 * @default {true}
	 */
	"std-on-jsr"?: boolean;
}
export function configurator(options: DenoLintRulesOptions = {}): Deno.lint.Plugin {
	const result: DenoLintRule[] = [];
	for (const {
		context,
		identifier,
		recommended
	} of rules) {
		//@ts-ignore Lazy type.
		const option: unknown = options[identifier];
		if (
			(typeof option === "boolean" && option) ||
			(typeof option === "undefined" && recommended)
		) {
			result.push({
				context: context(),
				identifier
			});
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
