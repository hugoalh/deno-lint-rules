import { assertEquals } from "STD/assert/equals";
import { data } from "./no_nan.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const a = NaN;`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const b = Number.NaN;`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const c = globalThis.NaN;`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 4", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const d = globalThis.Number.NaN;`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 5", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const b = Number["NaN"];`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 6", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const c = globalThis["NaN"];`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 7", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const d = globalThis.Number["NaN"];`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 8", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const d = globalThis["Number"].NaN;`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 9", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const d = globalThis["Number"]["NaN"];`);
	assertEquals(diagnostics.length, 1);
});
