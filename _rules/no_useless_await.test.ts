import { deepStrictEqual } from "node:assert";
import { constructPlugin } from "../_utility.ts";
import rule from "./no_useless_await.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `await 'value';`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), `await 'value'`);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `await Promise.resolve('value');`);
	deepStrictEqual(diagnostics.length, 0);
});
