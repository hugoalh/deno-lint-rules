import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_useless_block.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `function foo(a) {
	{
		doSomething(a);
	}
}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `function foo(a) {
	doSomething(a);
	{
		doAnotherSomething(a);
	}
}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `function foo(a) {
	doSomething(a);
}`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const c = 1;
{
	const c = 2;
}
console.log(c);
//=> 1`);
	deepStrictEqual(diagnostics.length, 0);
});
