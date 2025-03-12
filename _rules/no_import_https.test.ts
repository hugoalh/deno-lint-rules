import { assertEquals } from "STD/assert/equals";
import { data } from "./no_import_https.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Export AllDeclaration DoubleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `export * as x from "https://example.com/x.ts";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Export AllDeclaration SingleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `export * as x from 'https://example.com/x.ts';`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Export NamedDeclaration DoubleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `export { x } from "https://example.com/x.ts";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Export NamedDeclaration SingleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `export { x } from 'https://example.com/x.ts';`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Import AllDeclaration DoubleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import * as x from "https://example.com/x.ts";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Import AllDeclaration SingleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import * as x from 'https://example.com/x.ts';`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Import DefaultDeclaration DoubleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import x from "https://example.com/x.ts";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Import DefaultDeclaration SingleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import x from 'https://example.com/x.ts';`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Import NamedDeclaration DoubleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import { x } from "https://example.com/x.ts";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Import NamedDeclaration SingleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import { x } from 'https://example.com/x.ts';`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Import Expression DoubleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const x = await import("https://example.com/x.ts");`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Import Expression SingleQuote", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const x = await import('https://example.com/x.ts');`);
	assertEquals(diagnostics.length, 1);
});
