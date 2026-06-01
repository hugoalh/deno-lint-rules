import { deepStrictEqual } from "node:assert";
import rule from "./no_namespace_implementation.ts";
import { constructPlugin } from "../_utility.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `namespace A {
	export let x = 1;
}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `namespace TypeOnly {
	export type A = string;
}
`);
	deepStrictEqual(diagnostics.length, 0);
});
