import { assertEquals } from "STD/assert/equals";
import { data } from "./no_duplicate_interfaces.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `interface Foo {
	a: string;
	b: string;
}
interface Foo {
	c: string;
	d: string;
}`);
	assertEquals(diagnostics.length, 2);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `interface Foo {
	a: string;
	b: string;
}
interface Bar {
	a: string;
	b: string;
}`);
	assertEquals(diagnostics.length, 2);
});
