import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_alert.ts";
import {
	constructPlugin,
	getContextPositionForDiagnostics
} from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `alert();`;
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	const positions = getContextPositionForDiagnostics(sample, diagnostics);
	deepStrictEqual(positions[0], [1, 1, 1, 6]);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const sample = `globalThis.alert();`;
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	const positions = getContextPositionForDiagnostics(sample, diagnostics);
	deepStrictEqual(positions[0], [1, 1, 1, 17]);
});
Deno.test("Invalid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `globalThis.window.alert();`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 4", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `window.alert();`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 5", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `globalThis["alert"]`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 6", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `window["alert"]`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 7", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `globalThis.window["alert"]`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 8", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `globalThis["window"].alert`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 9", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `globalThis["window"]["alert"]`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `foo.alert();`);
	deepStrictEqual(diagnostics.length, 0);
});
