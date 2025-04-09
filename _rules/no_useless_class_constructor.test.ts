import { deepStrictEqual } from "node:assert";
import { data } from "./no_useless_class_constructor.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Empty Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `class Foo {
	constructor() {
	}
}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Comment Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `class Foo {
	constructor() {
		// comment
	}
}`);
	deepStrictEqual(diagnostics.length, 1);
});
