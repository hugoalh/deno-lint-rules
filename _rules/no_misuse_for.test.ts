import { deepStrictEqual } from "node:assert";
import { constructPlugin } from "../_utility.ts";
import rule from "./no_misuse_for.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `const foo = [1, 2, 3];
let index = 0;
for (; index < foo.length; ) {
	console.log(foo[index]);
	index += 1
}`);
	deepStrictEqual(diagnostics.length, 1);
});
