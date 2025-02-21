import { assertEquals } from "STD/assert/equals";
import ruleNoImportProtocolNode from "./no_import_protocol_node.ts";
Deno.test("Import DoubleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(ruleNoImportProtocolNode, "test.ts", `import path from "node:path";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Import SingleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(ruleNoImportProtocolNode, "test.ts", `import path from 'node:path';`);
	assertEquals(diagnostics.length, 1);
});
