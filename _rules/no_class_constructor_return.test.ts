import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_class_constructor_return.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `class A {
	constructor(a) {
		this.a = a;
		return a;
	}
}`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "return a;");
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const sample = `class B {
	constructor(f) {
		if (!f) {
			return 'falsy';
		}
	}
}`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "return 'falsy';");
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `class Foo {
	constructor() {
		this.bar = (a: number): string => {
			return a.toString();
		};
	}
}`);
	deepStrictEqual(diagnostics.length, 0);
});
