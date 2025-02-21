import recommended from "./recommended.ts";
import ruleNoImportProtocolJSR from "./rules/no_import_protocol_jsr.ts";
import ruleNoImportProtocolNode from "./rules/no_import_protocol_node.ts";
import ruleNoImportProtocolNPM from "./rules/no_import_protocol_npm.ts";
export default {
	name: "hugoalh",
	rules: {
		...recommended.rules,
		...ruleNoImportProtocolJSR.rules,
		...ruleNoImportProtocolNode.rules,
		...ruleNoImportProtocolNPM.rules
	}
} satisfies Deno.lint.Plugin;
