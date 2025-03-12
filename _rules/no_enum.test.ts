import { assertEquals } from "STD/assert/equals";
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
	assertEquals(diagnostics.length, 1);
});
