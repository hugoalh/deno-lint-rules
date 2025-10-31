//deno-lint-ignore-file hugoalh/no-character-ambiguous -- Test.
import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_character_ambiguous.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `const foo = "𝟮𝟯";`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 2);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "𝟮");
	deepStrictEqual(sample.slice(...diagnostics[1].range), "𝟯");
	deepStrictEqual(diagnostics[0].fix?.[0].text, "2");
	deepStrictEqual(diagnostics[1].fix?.[0].text, "3");
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = "23";`);
	deepStrictEqual(diagnostics.length, 0);
});
