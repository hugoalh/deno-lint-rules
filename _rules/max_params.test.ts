import { deepStrictEqual } from "node:assert";
import { ruleData } from "./max_params.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `function foo (a, b, c, d, e) {
	doSomething();
}`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const sample = `const foo = (a, b, c, d, e) => {
	doSomething();
};`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 3", { permissions: "none" }, () => {
	const sample = `class Foo {
	constructor(a, b, c, d, e) {
		doSomething();
	}
}`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `function foo (a, b, c, d) {
	doSomething();
}`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = (a, b, c, d) => {
	doSomething();
};`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Valid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `class Foo {
	constructor(a, b, c, d) {
		doSomething();
	}
}`);
	deepStrictEqual(diagnostics.length, 0);
});
