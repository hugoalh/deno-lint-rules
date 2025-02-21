import { assertEquals } from "STD/assert/equals";
import ruleNoImportProtocolHTTP from "./no_import_protocol_http.ts";
Deno.test("Import DoubleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(ruleNoImportProtocolHTTP, "test.ts", `import x from "http://example.com/x.js";`);
	assertEquals(diagnostics.length, 1);
	// const diagnostic = diagnostics[0];
	// assertEquals(diagnostic.fix?.text, `import x from "https://example.com/x.js";`);
});
Deno.test("Import SingleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(ruleNoImportProtocolHTTP, "test.ts", `import x from 'http://example.com/x.js';`);
	assertEquals(diagnostics.length, 1);
	// const diagnostic = diagnostics[0];
	// assertEquals(diagnostic.fix?.text, `import x from 'https://example.com/x.js';`);
});
