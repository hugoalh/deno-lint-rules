import { deepStrictEqual } from "node:assert";
import { data } from "./no_useless_class_static_block.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Empty Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `class Foo {
	static {
	}
}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Comment Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `class Foo {
	static {
		// comment
	}
}`);
	deepStrictEqual(diagnostics.length, 1);
});
