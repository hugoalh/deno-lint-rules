import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_alert.ts";
import {
	constructDenoLintPlugin,
	getContextPositionFromDiagnostics
} from "../_utility.ts";
const rule = constructDenoLintPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `alert();`;
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	const positions = getContextPositionFromDiagnostics(diagnostics, sample);
	deepStrictEqual(positions[0].lineBegin, 1);
	deepStrictEqual(positions[0].columnBegin, 1);
	deepStrictEqual(positions[0].lineEnd, 1);
	deepStrictEqual(positions[0].columnEnd, 6);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `globalThis.alert();`);
	deepStrictEqual(diagnostics.length, 1);
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
