import { deepStrictEqual } from "node:assert";
import { ruleData } from "./deno_lint_ignore_line_reason.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `//deno-lint-ignore no-explicit-any
function foo(): any {
	// ...
}`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `//deno-lint-ignore no-explicit-any -- It is fine.
function foo(): any {
	// ...
}`);
	deepStrictEqual(diagnostics.length, 0);
});
