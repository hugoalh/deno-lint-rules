import { assertEquals } from "STD/assert/equals";
import noImportProtocolBun from "../rules/no_import_protocol_bun.ts";
Deno.test("DoubleQuote", () => {
	const diagnostics = Deno.lint.runPlugin(noImportProtocolBun, "test.ts", `import { Database } from "bun:sqlite";`);
	assertEquals(diagnostics.length, 1);
	const diagnostic = diagnostics[0];
	assertEquals(diagnostic.id, "hugoalh/no-import-protocol-bun");
});
Deno.test("SingleQuote", () => {
	const diagnostics = Deno.lint.runPlugin(noImportProtocolBun, "test.ts", `import { Database } from 'bun:sqlite';`);
	assertEquals(diagnostics.length, 1);
	const diagnostic = diagnostics[0];
	assertEquals(diagnostic.id, "hugoalh/no-import-protocol-bun");
});
