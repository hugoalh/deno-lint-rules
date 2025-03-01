import { assertEquals } from "STD/assert/equals";
import { data } from "./no_enum.ts";
import { constructDenoLintPlugin } from "../_utility.ts";
const rule = constructDenoLintPlugin([{
	context: data.context(),
	identifier: data.identifier
}]);
Deno.test("Main", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `enum Foo {
	ONE = "one",
	TWO = "two"
}`);
	assertEquals(diagnostics.length, 1);
});
