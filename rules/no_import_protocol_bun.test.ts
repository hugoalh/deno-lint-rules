import { assertEquals } from "STD/assert/equals";
import ruleNoImportProtocolBun from "../rules/no_import_protocol_bun.ts";
/*
Deno.test("Export DoubleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(noImportProtocolBun, "test.ts", `export { Database } from "bun:sqlite";\nexport * as path from "node:path";`);
	assertEquals(diagnostics.length, 1);
}); 
*/
Deno.test("Import DoubleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(ruleNoImportProtocolBun, "test.ts", `import { Database } from "bun:sqlite";\nimport path from "node:path";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Import SingleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(ruleNoImportProtocolBun, "test.ts", `import { Database } from 'bun:sqlite';\nimport path from 'node:path';`);
	assertEquals(diagnostics.length, 1);
});
