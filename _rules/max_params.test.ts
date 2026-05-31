import { deepStrictEqual } from "node:assert";
import rule from "./max_params.ts";
import { constructPlugin } from "../_utility.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `function foo (a, b, c, d, e) {
	doSomething();
}`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "e");
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const sample = `const foo = (a, b, c, d, e) => {
	doSomething();
};`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "e");
});
Deno.test("Invalid 3", { permissions: "none" }, () => {
	const sample = `class Foo {
	constructor(a, b, c, d, e) {
		doSomething();
	}
}`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "e");
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `function foo (a, b, c, d) {
	doSomething();
}`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `const foo = (a, b, c, d) => {
	doSomething();
};`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Valid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `class Foo {
	constructor(a, b, c, d) {
		doSomething();
	}
}`);
	deepStrictEqual(diagnostics.length, 0);
});
