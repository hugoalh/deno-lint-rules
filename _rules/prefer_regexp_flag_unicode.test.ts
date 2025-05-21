import { deepStrictEqual } from "node:assert";
import { ruleData } from "./prefer_regexp_flag_unicode.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Literal Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = /aaa/;`);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(diagnostics[0].fix?.[0].text, `/aaa/u`);
});
Deno.test("Literal Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = /bbb/gi;`);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(diagnostics[0].fix?.[0].text, `/bbb/giu`);
});
Deno.test("Literal Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = /aaa/u;`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Literal Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = /bbb/giu;`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Literal Valid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = /aaa/v;`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Literal Valid 4", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = /bbb/giv;`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Constructor Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = new RegExp("ccc");`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Constructor Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = new RegExp("ddd", "gi");`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Constructor Valid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = new RegExp("ccc", "u");`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Constructor Valid 4", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = new RegExp("ddd", "giu");`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Constructor Valid 5", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = new RegExp("ccc", "v");`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Constructor Valid 6", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = new RegExp("ddd", "giv");`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Constructor Valid 7", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function bar(flags) {
	return new RegExp("eee", flags)
}`);
	deepStrictEqual(diagnostics.length, 0);
});
