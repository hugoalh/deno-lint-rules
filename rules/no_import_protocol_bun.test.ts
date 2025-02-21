import { assertEquals } from "STD/assert/equals";
import noImportProtocolBun from "../rules/no_import_protocol_bun.ts";
/*
Deno.test("Export DoubleQuote", () => {
	const diagnostics = Deno.lint.runPlugin(noImportProtocolBun, "test.ts", `export { Database } from "bun:sqlite";\nexport * as path from "node:path";`);
	assertEquals(diagnostics.length, 1);
	const diagnostic = diagnostics[0];
	assertEquals(diagnostic.id, "hugoalh/no-import-protocol-bun");
});
*/
Deno.test("Import DoubleQuote", () => {
	const diagnostics = Deno.lint.runPlugin(noImportProtocolBun, "test.ts", `import { Database } from "bun:sqlite";\nimport path from "node:path";`);
	assertEquals(diagnostics.length, 1);
	const diagnostic = diagnostics[0];
	assertEquals(diagnostic.id, "hugoalh/no-import-protocol-bun");
});
Deno.test("Import SingleQuote", () => {
	const diagnostics = Deno.lint.runPlugin(noImportProtocolBun, "test.ts", `import { Database } from 'bun:sqlite';\nimport path from 'node:path';`);
	assertEquals(diagnostics.length, 1);
	const diagnostic = diagnostics[0];
	assertEquals(diagnostic.id, "hugoalh/no-import-protocol-bun");
});
