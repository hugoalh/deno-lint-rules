import { deepStrictEqual } from "node:assert";
import rule from "./no_confirm.ts";
import { constructPlugin } from "../_utility.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `confirm();`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "confirm");
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const sample = `globalThis.confirm();`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "globalThis.confirm");
});
Deno.test("Invalid 3", { permissions: "none" }, () => {
	const sample = `globalThis.window.confirm();`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "globalThis.window.confirm");
});
Deno.test("Invalid 4", { permissions: "none" }, () => {
	const sample = `window.confirm();`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "window.confirm");
});
Deno.test("Invalid 5", { permissions: "none" }, () => {
	const sample = `globalThis["confirm"]();`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), `globalThis["confirm"]`);
});
Deno.test("Invalid 6", { permissions: "none" }, () => {
	const sample = `window["confirm"]();`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), `window["confirm"]`);
});
Deno.test("Invalid 7", { permissions: "none" }, () => {
	const sample = `globalThis.window["confirm"]();`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), `globalThis.window["confirm"]`);
});
Deno.test("Invalid 8", { permissions: "none" }, () => {
	const sample = `globalThis["window"].confirm();`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), `globalThis["window"].confirm`);
});
Deno.test("Invalid 9", { permissions: "none" }, () => {
	const sample = `globalThis["window"]["confirm"]();`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), `globalThis["window"]["confirm"]`);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `foo.confirm();`);
	deepStrictEqual(diagnostics.length, 0);
});
