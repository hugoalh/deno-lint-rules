import { assertEquals } from "STD/assert/equals";
import { data } from "./no_import_http.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin([{
	context: data.context(),
	identifier: data.identifier
}]);
Deno.test("Import DoubleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import x from "http://example.com/x.ts";`);
	assertEquals(diagnostics.length, 1);
	//@ts-expect-error Deno provide wrong type.
	assertEquals(diagnostics[0].fix[0].text, `"https://example.com/x.ts"`);
});
Deno.test("Import SingleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import x from 'http://example.com/x.ts';`);
	assertEquals(diagnostics.length, 1);
	//@ts-expect-error Deno provide wrong type.
	assertEquals(diagnostics[0].fix[0].text, `'https://example.com/x.ts'`);
});
