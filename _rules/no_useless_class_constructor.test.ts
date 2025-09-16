import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_useless_class_constructor.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Empty Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `class Foo {
	constructor() {
	}
}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Comment Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `class Foo {
	constructor() {
		// comment
	}
}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Super Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `class Foo extends Bar {
	constructor() {
		super();
	}
}`);
	deepStrictEqual(diagnostics.length, 1);
});
