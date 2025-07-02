import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_duplicate_typeofs.ts";
import {
	constructPlugin,
	getContextPositionForDiagnostics
} from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `typeof typeof globalThis;`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	const positions = getContextPositionForDiagnostics(sample, diagnostics);
	deepStrictEqual(positions[0], [1, 1, 1, 7]);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const sample = `typeof typeof typeof typeof typeof typeof typeof typeof typeof typeof globalThis;`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 9);
	const positions = getContextPositionForDiagnostics(sample, diagnostics);
	deepStrictEqual(positions[0], [1, 1, 1, 7]);
	deepStrictEqual(positions[1], [1, 8, 1, 14]);
	deepStrictEqual(positions[2], [1, 15, 1, 21]);
	deepStrictEqual(positions[3], [1, 22, 1, 28]);
	deepStrictEqual(positions[4], [1, 29, 1, 35]);
	deepStrictEqual(positions[5], [1, 36, 1, 42]);
	deepStrictEqual(positions[6], [1, 43, 1, 49]);
	deepStrictEqual(positions[7], [1, 50, 1, 56]);
	deepStrictEqual(positions[8], [1, 57, 1, 63]);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `typeof globalThis;`);
	deepStrictEqual(diagnostics.length, 0);
});
