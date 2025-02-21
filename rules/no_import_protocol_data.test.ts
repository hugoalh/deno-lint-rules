import { assertEquals } from "STD/assert/equals";
import noImportProtocolData from "./no_import_protocol_data.ts";
Deno.test("Import DoubleQuote", () => {
	const diagnostics = Deno.lint.runPlugin(noImportProtocolData, "test.ts", `import x from "data:text/javascript,export default 42;";`);
	assertEquals(diagnostics.length, 1);
	const diagnostic = diagnostics[0];
	assertEquals(diagnostic.id, "hugoalh/no-import-protocol-data");
});
Deno.test("Import SingleQuote", () => {
	const diagnostics = Deno.lint.runPlugin(noImportProtocolData, "test.ts", `import x from 'data:text/javascript,export default 42;';`);
	assertEquals(diagnostics.length, 1);
	const diagnostic = diagnostics[0];
	assertEquals(diagnostic.id, "hugoalh/no-import-protocol-data");
});
