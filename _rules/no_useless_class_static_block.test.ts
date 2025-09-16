import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_useless_class_static_block.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Empty Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `class Foo {
	static {
	}
}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Comment Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `class Foo {
	static {
		// comment
	}
}`);
	deepStrictEqual(diagnostics.length, 1);
});
