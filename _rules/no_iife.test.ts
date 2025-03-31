import { assertEquals } from "STD/assert/equals";
import { data } from "./no_iife.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Invalid Standard", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `(function () {
	// Statements...
})();`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid Standard Async", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `(async function () {
	// Statements...
})();`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid Arrow", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `(() => {
	// Statements...
})();`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid Arrow Async", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `(async () => {
	// Statements...
})();`);
	assertEquals(diagnostics.length, 1);
});
