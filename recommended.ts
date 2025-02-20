import ruleNoImportProtocolBun from "./rules/no_import_protocol_bun.ts";
import ruleNoImportProtocolData from "./rules/no_import_protocol_data.ts";
import ruleNoImportProtocolFile from "./rules/no_import_protocol_file.ts";
import ruleNoImportProtocolHTTP from "./rules/no_import_protocol_http.ts";
import ruleStandardNaming from "./rules/standard_naming.ts";
export default {
	name: "hugoalh",
	rules: {
		...ruleNoImportProtocolBun.rules,
		...ruleNoImportProtocolData.rules,
		...ruleNoImportProtocolFile.rules,
		...ruleNoImportProtocolHTTP.rules,
		...ruleStandardNaming.rules
	}
} satisfies Deno.lint.Plugin;
