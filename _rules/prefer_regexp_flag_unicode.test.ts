import { assertEquals } from "STD/assert/equals";
import { data } from "./prefer_regexp_flag_unicode.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Literal Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = /aaa/;`);
	assertEquals(diagnostics.length, 1);
	assertEquals(diagnostics[0].fix?.[0].text, `/aaa/u`);
});
Deno.test("Literal Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = /bbb/gi;`);
	assertEquals(diagnostics.length, 1);
	assertEquals(diagnostics[0].fix?.[0].text, `/bbb/giu`);
});
Deno.test("Literal Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = /aaa/u;`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("Literal Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = /bbb/giu;`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("Literal Valid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = /aaa/v;`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("Literal Valid 4", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = /bbb/giv;`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("Constructor Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = new RegExp("ccc");`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("Constructor Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = new RegExp("ddd", "gi");`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("Constructor Valid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = new RegExp("ccc", "u");`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("Constructor Valid 4", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = new RegExp("ddd", "giu");`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("Constructor Valid 5", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = new RegExp("ccc", "v");`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("Constructor Valid 6", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = new RegExp("ddd", "giv");`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("Constructor Valid 7", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function bar(flags) {
	return new RegExp("eee", flags)
}`);
	assertEquals(diagnostics.length, 0);
});
