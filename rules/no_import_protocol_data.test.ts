import { assertEquals } from "STD/assert/equals";
import ruleNoImportProtocolData from "./no_import_protocol_data.ts";
Deno.test("Import DoubleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(ruleNoImportProtocolData, "test.ts", `import x from "data:text/javascript,export default 42;";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Import SingleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(ruleNoImportProtocolData, "test.ts", `import x from 'data:text/javascript,export default 42;';`);
	assertEquals(diagnostics.length, 1);
});
