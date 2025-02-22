import recommended from "./recommended.ts";
import ruleNoImportProtocolHTTPS from "./rules/no_import_protocol_https.ts";
import ruleNoImportProtocolJSR from "./rules/no_import_protocol_jsr.ts";
import ruleNoImportProtocolNode from "./rules/no_import_protocol_node.ts";
import ruleNoImportProtocolNPM from "./rules/no_import_protocol_npm.ts";
export default {
	name: "hugoalh",
	rules: {
		...recommended.rules,
		...ruleNoImportProtocolHTTPS.rules,
		...ruleNoImportProtocolJSR.rules,
		...ruleNoImportProtocolNode.rules,
		...ruleNoImportProtocolNPM.rules
	}
} satisfies Deno.lint.Plugin as Deno.lint.Plugin;
