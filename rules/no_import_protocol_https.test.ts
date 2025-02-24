import { assertEquals } from "STD/assert/equals";
import ruleNoImportProtocolHTTPS from "./no_import_protocol_https.ts";
Deno.test("Import DoubleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(ruleNoImportProtocolHTTPS, "test.ts", `import x from "https://example.com/x.ts";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Import SingleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(ruleNoImportProtocolHTTPS, "test.ts", `import x from 'https://example.com/x.ts';`);
	assertEquals(diagnostics.length, 1);
});
