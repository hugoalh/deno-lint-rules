import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_duplicate_voids.ts";
import {
	constructPlugin,
	getContextPositionForDiagnostics
} from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `void void doSomething();`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	const positions = getContextPositionForDiagnostics(sample, diagnostics);
	deepStrictEqual(positions[0], [1, 1, 1, 5]);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const sample = `void void void void void void void void void void doSomething();`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 9);
	const positions = getContextPositionForDiagnostics(sample, diagnostics);
	deepStrictEqual(positions[0], [1, 1, 1, 5]);
	deepStrictEqual(positions[1], [1, 6, 1, 10]);
	deepStrictEqual(positions[2], [1, 11, 1, 15]);
	deepStrictEqual(positions[3], [1, 16, 1, 20]);
	deepStrictEqual(positions[4], [1, 21, 1, 25]);
	deepStrictEqual(positions[5], [1, 26, 1, 30]);
	deepStrictEqual(positions[6], [1, 31, 1, 35]);
	deepStrictEqual(positions[7], [1, 36, 1, 40]);
	deepStrictEqual(positions[8], [1, 41, 1, 45]);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `void doSomething();`);
	deepStrictEqual(diagnostics.length, 0);
});
