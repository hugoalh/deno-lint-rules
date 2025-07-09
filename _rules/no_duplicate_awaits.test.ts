import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_duplicate_awaits.ts";
import {
	constructPlugin,
	getVisualPositionForDiagnostics
} from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `await await doSomething();`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	const positions = getVisualPositionForDiagnostics(sample, diagnostics);
	deepStrictEqual(positions[0], [1, 1, 1, 6]);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const sample = `await await await await await await await await await await doSomething();`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 9);
	const positions = getVisualPositionForDiagnostics(sample, diagnostics);
	deepStrictEqual(positions[0], [1, 1, 1, 6]);
	deepStrictEqual(positions[1], [1, 7, 1, 12]);
	deepStrictEqual(positions[2], [1, 13, 1, 18]);
	deepStrictEqual(positions[3], [1, 19, 1, 24]);
	deepStrictEqual(positions[4], [1, 25, 1, 30]);
	deepStrictEqual(positions[5], [1, 31, 1, 36]);
	deepStrictEqual(positions[6], [1, 37, 1, 42]);
	deepStrictEqual(positions[7], [1, 43, 1, 48]);
	deepStrictEqual(positions[8], [1, 49, 1, 54]);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `await doSomething();`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `await (await doSomething()).doAnotherSomething();`);
	deepStrictEqual(diagnostics.length, 0);
});
