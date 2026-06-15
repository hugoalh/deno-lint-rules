import { deepStrictEqual } from "node:assert";
import { constructPlugin } from "../_utility.ts";
import rule from "./consistent_jsdoc_tag.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `export interface Foo {
	/**
	 * @defaultvalue {5}
	 */
	max?: number;
}`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "@defaultvalue");
});
Deno.test("class Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `export interface Foo {
	/**
	 * @default {5}
	 */
	max?: number;
}`);
	deepStrictEqual(diagnostics.length, 0);
});
