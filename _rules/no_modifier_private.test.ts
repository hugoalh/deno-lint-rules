import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_modifier_private.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `class Foo {
	private value: string;
	private constructor() {
		this.value = "bar";
	}
}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `class Foo {
	#value: string;
	private constructor() {
		this.#value = "bar";
	}
}`);
	deepStrictEqual(diagnostics.length, 0);
});
