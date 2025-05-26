import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_class_constructor_return.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `class A {
	constructor(a) {
		this.a = a;
		return a;
	}
}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `class B {
	constructor(f) {
		if (!f) {
			return 'falsy';
		}
	}
}`);
	deepStrictEqual(diagnostics.length, 1);
});
