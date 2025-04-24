import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_duplicate_typeofs.ts";
import { constructDenoLintPlugin } from "../_utility.ts";
const rule = constructDenoLintPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `typeof typeof globalThis;`);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(diagnostics[0].hint, "Do you mean `typeof globalThis`?");
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `typeof typeof typeof typeof typeof typeof typeof typeof typeof typeof globalThis;`);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(diagnostics[0].hint, "Do you mean `typeof globalThis`?");
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `typeof globalThis;`);
	deepStrictEqual(diagnostics.length, 0);
});
