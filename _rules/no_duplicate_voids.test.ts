import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_duplicate_voids.ts";
import { constructDenoLintPlugin } from "../_utility.ts";
const rule = constructDenoLintPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `void void doSomething();`);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(diagnostics[0].hint, "Do you mean `void doSomething()`?");
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `void void void void void void void void void void doSomething();`);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(diagnostics[0].hint, "Do you mean `void doSomething()`?");
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `void doSomething();`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `void (void doSomething()).doAnotherSomething();`);
	deepStrictEqual(diagnostics.length, 0);
});
