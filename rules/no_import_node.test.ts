import { assertEquals } from "STD/assert/equals";
import { data } from "./no_import_node.ts";
import { constructDenoLintPlugin } from "../_utility.ts";
const rule = constructDenoLintPlugin([{
	context: data.context(),
	identifier: data.identifier
}]);
Deno.test("Import DoubleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import path from "node:path";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Import SingleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import path from 'node:path';`);
	assertEquals(diagnostics.length, 1);
});
