import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_iife.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid Standard", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `(function () {
	// Statements...
})();`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid Standard Async", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `(async function () {
	// Statements...
})();`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid Arrow", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `(() => {
	// Statements...
})();`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid Arrow Async", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `(async () => {
	// Statements...
})();`);
	deepStrictEqual(diagnostics.length, 1);
});
