//deno-lint-ignore-file hugoalh/no-character-ambiguous hugoalh/no-character-invisible -- Test.
import { deepStrictEqual } from "node:assert";
import rule from "./no_character_invisible.ts";
import { constructPlugin } from "../_utility.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `const foo = "Hello, world!";`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), " ");
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `const foo = "Hello, world!";`);
	deepStrictEqual(diagnostics.length, 0);
});
