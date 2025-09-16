//deno-lint-ignore-file hugoalh/no-character-ambiguous -- Test.
import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_character_ambiguous.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = "𝟮𝟯";`);
	deepStrictEqual(diagnostics.length, 2);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = "23";`);
	deepStrictEqual(diagnostics.length, 0);
});
