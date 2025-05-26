import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_enum.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.context()
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
