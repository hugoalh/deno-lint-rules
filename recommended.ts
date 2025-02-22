import ruleNoImportProtocolBun from "./rules/no_import_protocol_bun.ts";
import ruleNoImportProtocolData from "./rules/no_import_protocol_data.ts";
import ruleNoImportProtocolFile from "./rules/no_import_protocol_file.ts";
import ruleNoImportProtocolHTTP from "./rules/no_import_protocol_http.ts";
import ruleStandardIdentifierName from "./rules/standard_identifier_name.ts";
import ruleStdOnJSR from "./rules/std_on_jsr.ts";
export default {
	name: "hugoalh",
	rules: {
		...ruleNoImportProtocolBun.rules,
		...ruleNoImportProtocolData.rules,
		...ruleNoImportProtocolFile.rules,
		...ruleNoImportProtocolHTTP.rules,
		...ruleStandardIdentifierName.rules,
		...ruleStdOnJSR.rules
	}
} satisfies Deno.lint.Plugin as Deno.lint.Plugin;
