import { deepStrictEqual } from "node:assert";
import { constructPlugin } from "../_utility.ts";
import rule from "./no_modifier_public.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `class Foo {
	public value: string;
	public constructor() {
		this.value = "bar";
	}
}`);
	deepStrictEqual(diagnostics.length, 2);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `class Foo {
	value: string;
	constructor() {
		this.#value = "bar";
	}
}`);
	deepStrictEqual(diagnostics.length, 0);
});
