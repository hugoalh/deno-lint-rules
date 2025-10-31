import { deepStrictEqual } from "node:assert";
import { ruleData } from "./curly_for.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `for (let i = 0; i < items.length; i++) doSomething();`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "doSomething();");
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `for (let i = 0; i < items.length; i++) {
	doSomething();
}`);
	deepStrictEqual(diagnostics.length, 0);
});
