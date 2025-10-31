import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_duplicate_voids.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `void void doSomething();`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "void");
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const sample = `void void void void void void void void void void doSomething();`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 9);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "void");
	deepStrictEqual(sample.slice(...diagnostics[1].range), "void");
	deepStrictEqual(sample.slice(...diagnostics[2].range), "void");
	deepStrictEqual(sample.slice(...diagnostics[3].range), "void");
	deepStrictEqual(sample.slice(...diagnostics[4].range), "void");
	deepStrictEqual(sample.slice(...diagnostics[5].range), "void");
	deepStrictEqual(sample.slice(...diagnostics[6].range), "void");
	deepStrictEqual(sample.slice(...diagnostics[7].range), "void");
	deepStrictEqual(sample.slice(...diagnostics[8].range), "void");
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `void doSomething();`);
	deepStrictEqual(diagnostics.length, 0);
});
