import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_duplicate_voids.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `void void doSomething();`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `void void void void void void void void void void doSomething();`);
	deepStrictEqual(diagnostics.length, 9);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `void doSomething();`);
	deepStrictEqual(diagnostics.length, 0);
});
