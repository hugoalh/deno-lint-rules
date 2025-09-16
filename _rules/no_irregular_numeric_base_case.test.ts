import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_irregular_numeric_base_case.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("BigInt Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = 0B101n;`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("BigInt Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = 0O43n;`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("BigInt Invalid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = 0XCDn;`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("BigInt Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = 0b101n;`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("BigInt Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = 0o43n;`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("BigInt Valid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = 0xCDn;`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Number Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = 0B101;`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Number Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = 0O43;`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Number Invalid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = 0XCD;`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Number Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = 0b101;`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Number Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = 0o43;`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Number Valid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = 0xCD;`);
	deepStrictEqual(diagnostics.length, 0);
});
