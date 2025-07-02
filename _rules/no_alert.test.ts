import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_alert.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `alert();`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const sample = `globalThis.alert();`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `globalThis.window.alert();`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 4", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `window.alert();`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 5", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `globalThis["alert"]`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 6", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `window["alert"]`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 7", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `globalThis.window["alert"]`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 8", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `globalThis["window"].alert`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 9", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `globalThis["window"]["alert"]`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `foo.alert();`);
	deepStrictEqual(diagnostics.length, 0);
});
