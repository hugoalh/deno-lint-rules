import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_duplicate_awaits.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `await await doSomething();`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "await");
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const sample = `await await await await await await await await await await doSomething();`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 9);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "await");
	deepStrictEqual(sample.slice(...diagnostics[1].range), "await");
	deepStrictEqual(sample.slice(...diagnostics[2].range), "await");
	deepStrictEqual(sample.slice(...diagnostics[3].range), "await");
	deepStrictEqual(sample.slice(...diagnostics[4].range), "await");
	deepStrictEqual(sample.slice(...diagnostics[5].range), "await");
	deepStrictEqual(sample.slice(...diagnostics[6].range), "await");
	deepStrictEqual(sample.slice(...diagnostics[7].range), "await");
	deepStrictEqual(sample.slice(...diagnostics[8].range), "await");
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `await doSomething();`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `await (await doSomething()).doAnotherSomething();`);
	deepStrictEqual(diagnostics.length, 0);
});
