import { assertEquals } from "STD/assert/equals";
import { data } from "./restrict_module.ts";
import { constructDenoLintPlugin } from "../_utility.ts";
const rule = constructDenoLintPlugin([{
	context: data.context(),
	identifier: data.identifier
}]);
Deno.test("Import Data DoubleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import x from "data:text/javascript,export default 42;";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Import Data SingleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import x from 'data:text/javascript,export default 42;';`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Import Node DoubleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import path from "node:path";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Import Node SingleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import path from 'node:path';`);
	assertEquals(diagnostics.length, 1);
});
