import { assertEquals } from "STD/assert/equals";
import { data } from "./no_import_http.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Export AllDeclaration DoubleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `export * as x from "http://example.com/x.ts";`);
	assertEquals(diagnostics.length, 1);
	assertEquals(diagnostics[0].fix?.[0].text, `"https://example.com/x.ts"`);
});
Deno.test("Export AllDeclaration SingleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `export * as x from 'http://example.com/x.ts';`);
	assertEquals(diagnostics.length, 1);
	assertEquals(diagnostics[0].fix?.[0].text, `'https://example.com/x.ts'`);
});
Deno.test("Export NamedDeclaration DoubleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `export { x } from "http://example.com/x.ts";`);
	assertEquals(diagnostics.length, 1);
	assertEquals(diagnostics[0].fix?.[0].text, `"https://example.com/x.ts"`);
});
Deno.test("Export NamedDeclaration SingleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `export { x } from 'http://example.com/x.ts';`);
	assertEquals(diagnostics.length, 1);
	assertEquals(diagnostics[0].fix?.[0].text, `'https://example.com/x.ts'`);
});
Deno.test("Import AllDeclaration DoubleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import * as x from "http://example.com/x.ts";`);
	assertEquals(diagnostics.length, 1);
	assertEquals(diagnostics[0].fix?.[0].text, `"https://example.com/x.ts"`);
});
Deno.test("Import AllDeclaration SingleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import * as x from 'http://example.com/x.ts';`);
	assertEquals(diagnostics.length, 1);
	assertEquals(diagnostics[0].fix?.[0].text, `'https://example.com/x.ts'`);
});
Deno.test("Import DefaultDeclaration DoubleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import x from "http://example.com/x.ts";`);
	assertEquals(diagnostics.length, 1);
	assertEquals(diagnostics[0].fix?.[0].text, `"https://example.com/x.ts"`);
});
Deno.test("Import DefaultDeclaration SingleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import x from 'http://example.com/x.ts';`);
	assertEquals(diagnostics.length, 1);
	assertEquals(diagnostics[0].fix?.[0].text, `'https://example.com/x.ts'`);
});
Deno.test("Import NamedDeclaration DoubleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import { x } from "http://example.com/x.ts";`);
	assertEquals(diagnostics.length, 1);
	assertEquals(diagnostics[0].fix?.[0].text, `"https://example.com/x.ts"`);
});
Deno.test("Import NamedDeclaration SingleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import { x } from 'http://example.com/x.ts';`);
	assertEquals(diagnostics.length, 1);
	assertEquals(diagnostics[0].fix?.[0].text, `'https://example.com/x.ts'`);
});
Deno.test("Import Expression DoubleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const x = await import("http://example.com/x.ts");`);
	assertEquals(diagnostics.length, 1);
	assertEquals(diagnostics[0].fix?.[0].text, `"https://example.com/x.ts"`);
});
Deno.test("Import Expression SingleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const x = await import('http://example.com/x.ts');`);
	assertEquals(diagnostics.length, 1);
	assertEquals(diagnostics[0].fix?.[0].text, `'https://example.com/x.ts'`);
});
