import { deepStrictEqual } from "node:assert";
import rule from "./curly_for.ts";
import { constructPlugin } from "../_utility.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `for (let i = 0; i < items.length; i++) doSomething();`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "doSomething();");
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `for (let i = 0; i < items.length; i++) {
	doSomething();
}`);
	deepStrictEqual(diagnostics.length, 0);
});
