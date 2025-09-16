import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_duplicate_interface_contexts.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `interface Foo {
	a: string;
	b: number;
}
interface Bar {
	a: string;
	b: number;
}`);
	deepStrictEqual(diagnostics.length, 2);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `interface Foo {
	a: string;
	b: number;
}
interface Bar<T extends string> {
	a: T;
	b: number;
}`);
	deepStrictEqual(diagnostics.length, 0);
});
