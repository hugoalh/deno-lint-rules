import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_prompt.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `prompt();`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "prompt");
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const sample = `globalThis.prompt();`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "globalThis.prompt");
});
Deno.test("Invalid 3", { permissions: "none" }, () => {
	const sample = `globalThis.window.prompt();`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "globalThis.window.prompt");
});
Deno.test("Invalid 4", { permissions: "none" }, () => {
	const sample = `window.prompt();`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "window.prompt");
});
Deno.test("Invalid 5", { permissions: "none" }, () => {
	const sample = `globalThis["prompt"]();`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), `globalThis["prompt"]`);
});
Deno.test("Invalid 6", { permissions: "none" }, () => {
	const sample = `window["prompt"]();`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), `window["prompt"]`);
});
Deno.test("Invalid 7", { permissions: "none" }, () => {
	const sample = `globalThis.window["prompt"]();`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), `globalThis.window["prompt"]`);
});
Deno.test("Invalid 8", { permissions: "none" }, () => {
	const sample = `globalThis["window"].prompt();`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), `globalThis["window"].prompt`);
});
Deno.test("Invalid 9", { permissions: "none" }, () => {
	const sample = `globalThis["window"]["prompt"]();`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), `globalThis["window"]["prompt"]`);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `foo.prompt();`);
	deepStrictEqual(diagnostics.length, 0);
});
