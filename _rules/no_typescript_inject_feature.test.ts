import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_typescript_inject_feature.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `enum Foo {
	ONE = "one",
	TWO = "two"
}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `enum Roles {
	Admin,
	Writer,
	Reader
}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `class Foo {
	private value: string;
	private constructor() {
		this.value = "bar";
	}
}`);
	deepStrictEqual(diagnostics.length, 2);
});
Deno.test("Invalid 4", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `class Foo {
	public value: string;
	public constructor() {
		this.value = "bar";
	}
}`);
	deepStrictEqual(diagnostics.length, 2);
});
