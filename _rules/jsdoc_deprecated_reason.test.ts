import { deepStrictEqual } from "node:assert";
import { ruleData } from "./jsdoc_deprecated_reason.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `/**
 * @deprecated
 */
export const foo = 42;`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "@deprecated");
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `/**
 * @deprecated This will be removed in 1.0.0.
 */
export const foo = 42;`);
	deepStrictEqual(diagnostics.length, 0);
});
