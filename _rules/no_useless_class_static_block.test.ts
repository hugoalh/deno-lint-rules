import { assertEquals } from "STD/assert/equals";
import { data } from "./no_useless_class_static_block.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin([{
	context: data.context(),
	identifier: data.identifier
}]);
Deno.test("Empty", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `class Foo {
	static {}
}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Comment", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `class Foo {
	static {
		// comment
	}
}`);
	assertEquals(diagnostics.length, 1);
});
