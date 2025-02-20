import recommended from "./recommended.ts";
import ruleNoImportProtocolNode from "./rules/no_import_protocol_node.ts";
export default {
	name: "hugoalh",
	rules: {
		...recommended.rules,
		...ruleNoImportProtocolNode.rules
	}
} satisfies Deno.lint.Plugin;
