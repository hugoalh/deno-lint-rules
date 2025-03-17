import { assertEquals } from "STD/assert/equals";
import { data } from "./no_import_file.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Import DefaultDeclaration DoubleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import x from "file:///C:/path/to/the/file.ts";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Import DefaultDeclaration SingleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import x from 'file:///C:/path/to/the/file.ts';`);
	assertEquals(diagnostics.length, 1);
});
