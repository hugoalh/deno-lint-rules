import { deepStrictEqual } from "node:assert";
import { ruleData } from "./deno_coverage_ignore_file_reason.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `//deno-coverage-ignore-file
if (foo) {
}`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `//deno-coverage-ignore-file It is fine.
if (foo) {
}`);
	deepStrictEqual(diagnostics.length, 0);
});
