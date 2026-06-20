import { deepStrictEqual } from "node:assert";
import { constructPlugin } from "../_utility.ts";
import rule from "./no_duplicate_spreads.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `const a = {
	x: 1,
	y: 2
}
const foo = {
	...a,
	x: 2,
	...a
}`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "...a");
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `const a = {
	x: 1,
	y: 2
}
const foo = {
	...a,
	x: 2
}`);
	deepStrictEqual(diagnostics.length, 0);
});
