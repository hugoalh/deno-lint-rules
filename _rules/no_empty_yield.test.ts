import { deepStrictEqual } from "node:assert";
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
	deepStrictEqual(diagnostics.length, 1);
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
	deepStrictEqual(diagnostics.length, 5);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function* foo() {
	doSomething();
	yield undefined;
}`);
	deepStrictEqual(diagnostics.length, 0);
});
