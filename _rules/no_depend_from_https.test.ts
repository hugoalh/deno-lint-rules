import { deepStrictEqual } from "node:assert";
import { constructPlugin } from "../_utility.ts";
import rule from "./no_depend_from_https.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Export AllDeclaration DoubleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `export * as x from "https://example.com/x.ts";`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Export AllDeclaration SingleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `export * as x from 'https://example.com/x.ts';`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Export NamedDeclaration DoubleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `export { x } from "https://example.com/x.ts";`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Export NamedDeclaration SingleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `export { x } from 'https://example.com/x.ts';`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Import AllDeclaration DoubleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `import * as x from "https://example.com/x.ts";`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Import AllDeclaration SingleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `import * as x from 'https://example.com/x.ts';`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Import DefaultDeclaration DoubleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `import x from "https://example.com/x.ts";`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Import DefaultDeclaration SingleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `import x from 'https://example.com/x.ts';`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Import NamedDeclaration DoubleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `import { x } from "https://example.com/x.ts";`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Import NamedDeclaration SingleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `import { x } from 'https://example.com/x.ts';`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Import Expression DoubleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `const x = await import("https://example.com/x.ts");`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Import Expression SingleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `const x = await import('https://example.com/x.ts');`);
	deepStrictEqual(diagnostics.length, 1);
});
