import { assertEquals } from "STD/assert/equals";
import { data } from "./no_useless_block.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function foo(a) {
	{
		doSomething(a);
	}
}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function foo(a) {
	doSomething(a);
}`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function foo(a) {
	doSomething(a);
	{
		doAnotherSomething(a);
	}
}`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("Valid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const c = 1;
{
	const c = 2;
}
console.log(c);
//=> 1`);
	assertEquals(diagnostics.length, 0);
});
