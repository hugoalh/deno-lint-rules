import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_depend_from_http.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Export AllDeclaration DoubleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `export * as x from "http://example.com/x.ts";`);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(diagnostics[0].fix?.[0].text, `"https://example.com/x.ts"`);
});
Deno.test("Export AllDeclaration SingleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `export * as x from 'http://example.com/x.ts';`);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(diagnostics[0].fix?.[0].text, `'https://example.com/x.ts'`);
});
Deno.test("Export NamedDeclaration DoubleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `export { x } from "http://example.com/x.ts";`);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(diagnostics[0].fix?.[0].text, `"https://example.com/x.ts"`);
});
Deno.test("Export NamedDeclaration SingleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `export { x } from 'http://example.com/x.ts';`);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(diagnostics[0].fix?.[0].text, `'https://example.com/x.ts'`);
});
Deno.test("Import AllDeclaration DoubleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `import * as x from "http://example.com/x.ts";`);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(diagnostics[0].fix?.[0].text, `"https://example.com/x.ts"`);
});
Deno.test("Import AllDeclaration SingleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `import * as x from 'http://example.com/x.ts';`);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(diagnostics[0].fix?.[0].text, `'https://example.com/x.ts'`);
});
Deno.test("Import DefaultDeclaration DoubleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `import x from "http://example.com/x.ts";`);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(diagnostics[0].fix?.[0].text, `"https://example.com/x.ts"`);
});
Deno.test("Import DefaultDeclaration SingleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `import x from 'http://example.com/x.ts';`);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(diagnostics[0].fix?.[0].text, `'https://example.com/x.ts'`);
});
Deno.test("Import NamedDeclaration DoubleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `import { x } from "http://example.com/x.ts";`);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(diagnostics[0].fix?.[0].text, `"https://example.com/x.ts"`);
});
Deno.test("Import NamedDeclaration SingleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `import { x } from 'http://example.com/x.ts';`);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(diagnostics[0].fix?.[0].text, `'https://example.com/x.ts'`);
});
Deno.test("Import Expression DoubleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const x = await import("http://example.com/x.ts");`);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(diagnostics[0].fix?.[0].text, `"https://example.com/x.ts"`);
});
Deno.test("Import Expression SingleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const x = await import('http://example.com/x.ts');`);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(diagnostics[0].fix?.[0].text, `'https://example.com/x.ts'`);
});
