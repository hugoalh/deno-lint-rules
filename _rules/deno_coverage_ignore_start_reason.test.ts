import { deepStrictEqual } from "node:assert";
import { constructPlugin } from "../_utility.ts";
import rule from "./deno_coverage_ignore_start_reason.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `//deno-coverage-ignore-start
if (foo) {
}
//deno-coverage-ignore-stop`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "//deno-coverage-ignore-start");
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `//deno-coverage-ignore-start It is fine.
if (foo) {
}
//deno-coverage-ignore-stop`);
	deepStrictEqual(diagnostics.length, 0);
});
