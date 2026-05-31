import { deepStrictEqual } from "node:assert";
import rule from "./no_duplicate_interfaces.ts";
import { constructPlugin } from "../_utility.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `interface Foo {
	a: string;
	b: number;
}
interface Bar {
	a: string;
	b: number;
}`);
	deepStrictEqual(diagnostics.length, 2);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `interface Foo {
	a: string;
	b: number;
}
interface Bar<T extends string> {
	a: T;
	b: number;
}`);
	deepStrictEqual(diagnostics.length, 0);
});
