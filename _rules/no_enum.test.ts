import { deepStrictEqual } from "node:assert";
import { data } from "./no_enum.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `enum Foo {
	ONE = "one",
	TWO = "two"
}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `enum Roles {
	Admin,
	Writer,
	Reader
}`);
	deepStrictEqual(diagnostics.length, 1);
});
