//deno-lint-ignore-file hugoalh/no-character-ambiguous hugoalh/no-character-invisible -- Test.
import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_character_invisible.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = "Hello, world!";`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = "Hello, world!";`);
	deepStrictEqual(diagnostics.length, 0);
});
