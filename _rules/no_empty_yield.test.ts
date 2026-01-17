import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_empty_yield.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `function* foo() {
	doSomething();
	yield;
}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `function* foo() {
	doSomething();
	yield undefined;
}`);
	deepStrictEqual(diagnostics.length, 0);
});
