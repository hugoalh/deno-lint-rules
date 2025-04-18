import { deepStrictEqual } from "node:assert";
import { data } from "./no_class_constructor_return.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `class A {
	constructor(a) {
		this.a = a;
		return a;
	}
}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `class B {
	constructor(f) {
		if (!f) {
			return 'falsy';
		}
	}
}`);
	deepStrictEqual(diagnostics.length, 1);
});
