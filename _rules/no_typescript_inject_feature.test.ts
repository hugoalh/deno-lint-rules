import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_typescript_inject_feature.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `enum Foo {
	ONE = "one",
	TWO = "two"
}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `enum Roles {
	Admin,
	Writer,
	Reader
}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 3", { permissions: "none" }, () => {
	const sample = `class Params {
	constructor(
		public readonly x: number,
		protected y: number,
		private z: number
	) {
		// ...
	}
}`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 3);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "public readonly x: number");
	deepStrictEqual(sample.slice(...diagnostics[1].range), "protected y: number");
	deepStrictEqual(sample.slice(...diagnostics[2].range), "private z: number");
});
