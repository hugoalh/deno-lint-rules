import { assertEquals } from "STD/assert/equals";
import { data } from "./no_import_absolute.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Import DefaultDeclaration DoubleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import x from "/path/to/the/file.ts";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Import DefaultDeclaration SingleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import x from '/path/to/the/file.ts';`);
	assertEquals(diagnostics.length, 1);
});
