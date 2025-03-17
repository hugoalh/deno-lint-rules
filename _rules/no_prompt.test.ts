import { assertEquals } from "STD/assert/equals";
import { data } from "./no_prompt.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `prompt();`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `globalThis.prompt();`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `globalThis.window.prompt();`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 4", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `window.prompt();`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 5", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `globalThis["prompt"]`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 6", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `window["prompt"]`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 7", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `globalThis.window["prompt"]`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 8", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `globalThis["window"].prompt`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 9", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `globalThis["window"]["prompt"]`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `foo.prompt();`);
	assertEquals(diagnostics.length, 0);
});
