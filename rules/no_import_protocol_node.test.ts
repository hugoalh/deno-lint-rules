import { assertEquals } from "STD/assert/equals";
import noImportProtocolNode from "./no_import_protocol_node.ts";
Deno.test("DoubleQuote", () => {
	const diagnostics = Deno.lint.runPlugin(noImportProtocolNode, "test.ts", `import path from "node:path";`);
	assertEquals(diagnostics.length, 1);
	const diagnostic = diagnostics[0];
	assertEquals(diagnostic.id, "hugoalh/no-import-protocol-node");
});
Deno.test("SingleQuote", () => {
	const diagnostics = Deno.lint.runPlugin(noImportProtocolNode, "test.ts", `import path from 'node:path';`);
	assertEquals(diagnostics.length, 1);
	const diagnostic = diagnostics[0];
	assertEquals(diagnostic.id, "hugoalh/no-import-protocol-node");
});
