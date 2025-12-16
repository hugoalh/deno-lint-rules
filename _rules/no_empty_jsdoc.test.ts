import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_empty_jsdoc.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `/**
 * 
 */
export const foo = 42;`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), `/**
 * 
 */`);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `export const foo = 42;`);
	deepStrictEqual(diagnostics.length, 0);
});
