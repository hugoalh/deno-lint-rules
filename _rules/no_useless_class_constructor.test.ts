import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_useless_class_constructor.ts";
import { constructDenoLintPlugin } from "../_utility.ts";
const rule = constructDenoLintPlugin({
	[ruleData.identifier]: ruleData.context()
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
