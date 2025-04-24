import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_duplicate_interfaces.ts";
import { constructDenoLintPlugin } from "../_utility.ts";
const rule = constructDenoLintPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `interface Foo {
	a: string;
	b: string;
}
interface Foo {
	c: string;
	d: string;
}`);
	deepStrictEqual(diagnostics.length, 2);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `interface Foo {
	a: string;
	b: string;
}
interface Bar {
	a: string;
	b: string;
}`);
	deepStrictEqual(diagnostics.length, 2);
});
