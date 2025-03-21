import { assertEquals } from "STD/assert/equals";
import { data } from "./no_empty_yield.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function* foo() {
	doSomething();
	yield;
}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function* foo() {
	doSomething();
	yield;
	yield;
	yield;
	yield;
	yield;
}`);
	assertEquals(diagnostics.length, 5);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function* foo() {
	doSomething();
	yield undefined;
}`);
	assertEquals(diagnostics.length, 0);
});
