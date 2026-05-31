import { deepStrictEqual } from "node:assert";
import rule from "./no_iife.ts";
import { constructPlugin } from "../_utility.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid Standard", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `(function () {
	// Statements...
})();`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid Standard Async", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `(async function () {
	// Statements...
})();`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid Arrow", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `(() => {
	// Statements...
})();`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid Arrow Async", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `(async () => {
	// Statements...
})();`);
	deepStrictEqual(diagnostics.length, 1);
});
