import { assertEquals } from "STD/assert/equals";
import { data } from "./no_import_data.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Import DefaultDeclaration DoubleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import x from "data:text/javascript,export default 42;";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Import DefaultDeclaration SingleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import x from 'data:text/javascript,export default 42;';`);
	assertEquals(diagnostics.length, 1);
});
