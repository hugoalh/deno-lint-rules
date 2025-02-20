import { assertEquals } from "STD/assert/equals";
import noImportProtocolHTTP from "./no_import_protocol_http.ts";
Deno.test("DoubleQuote", () => {
	const diagnostics = Deno.lint.runPlugin(noImportProtocolHTTP, "test.ts", `import x from "http://example.com/x.js";`);
	assertEquals(diagnostics.length, 1);
	const diagnostic = diagnostics[0];
	assertEquals(diagnostic.id, "hugoalh/no-import-protocol-http");
	// assertEquals(diagnostic.fix?.text, `import x from "https://example.com/x.js";`);
});
Deno.test("SingleQuote", () => {
	const diagnostics = Deno.lint.runPlugin(noImportProtocolHTTP, "test.ts", `import x from 'http://example.com/x.js';`);
	assertEquals(diagnostics.length, 1);
	const diagnostic = diagnostics[0];
	assertEquals(diagnostic.id, "hugoalh/no-import-protocol-http");
	// assertEquals(diagnostic.fix?.text, `import x from 'https://example.com/x.js';`);
});
