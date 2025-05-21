import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_iife.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Invalid Standard", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `(function () {
	// Statements...
})();`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid Standard Async", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `(async function () {
	// Statements...
})();`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid Arrow", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `(() => {
	// Statements...
})();`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid Arrow Async", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `(async () => {
	// Statements...
})();`);
	deepStrictEqual(diagnostics.length, 1);
});
