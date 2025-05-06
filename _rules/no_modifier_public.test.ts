import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_modifier_public.ts";
import { constructDenoLintPlugin } from "../_utility.ts";
const rule = constructDenoLintPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `class Foo {
	public value: string;
	public constructor() {
		this.value = "bar";
	}
}`);
	deepStrictEqual(diagnostics.length, 2);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `class Foo {
	value: string;
	constructor() {
		this.#value = "bar";
	}
}`);
	deepStrictEqual(diagnostics.length, 0);
});
