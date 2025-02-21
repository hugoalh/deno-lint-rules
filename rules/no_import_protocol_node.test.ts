import { assertEquals } from "STD/assert/equals";
import noImportProtocolNode from "./no_import_protocol_node.ts";
Deno.test("Import DoubleQuote", () => {
	const diagnostics = Deno.lint.runPlugin(noImportProtocolNode, "test.ts", `import path from "node:path";`);
	assertEquals(diagnostics.length, 1);
	const diagnostic = diagnostics[0];
	assertEquals(diagnostic.id, "hugoalh/no-import-protocol-node");
});
Deno.test("Import SingleQuote", () => {
	const diagnostics = Deno.lint.runPlugin(noImportProtocolNode, "test.ts", `import path from 'node:path';`);
	assertEquals(diagnostics.length, 1);
	const diagnostic = diagnostics[0];
	assertEquals(diagnostic.id, "hugoalh/no-import-protocol-node");
});
