import { deepStrictEqual } from "node:assert";
import { ruleData } from "./prefer_hex_case.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("BigInt Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = 0x34cdn`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("BigInt Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = 0x34CDn`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Number Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = 0x34cd`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Number Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = 0x34CD`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("String X Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = "\\xa9"`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("String X Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = "\\xA9"`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("String X Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = "\\\\xa9"`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("String U Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = "\\u00a9"`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("String U Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = "\\ud87e\\udc04"`);
	deepStrictEqual(diagnostics.length, 2);
});
Deno.test("String U Invalid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = "\\\\ud87e\\udc04"`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("String U Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = "\\u00A9"`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("String U Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = "\\uD87E\\uDC04"`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("String U Valid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = "\\\\u00a9"`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("String U Valid 4", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = "\\\\ud87e\\\\udc04"`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("String UWrap Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = "\\u{2f804}"`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("String UWrap Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = "\\u{2F804}"`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("String UWrap Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = "\\\\u{2f804}"`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Template X Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = \`\\xa9\``);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Template X Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = \`\\xA9\``);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Template X Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = \`\\\\xa9\``);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Template U Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = \`\\u00a9\``);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Template U Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = \`\\ud87e\\udc04\``);
	deepStrictEqual(diagnostics.length, 2);
});
Deno.test("Template U Invalid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = \`\\\\ud87e\\udc04\``);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Template U Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = \`\\u00A9\``);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Template U Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = \`\\uD87E\\uDC04\``);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Template U Valid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = \`\\\\u00a9\``);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Template U Valid 4", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = \`\\\\ud87e\\\\udc04\``);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Template UWrap Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = \`\\u{2f804}\``);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Template UWrap Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = \`\\u{2F804}\``);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Template UWrap Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = \`\\\\u{2f804}\``);
	deepStrictEqual(diagnostics.length, 0);
});
