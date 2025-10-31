import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_duplicate_typeofs.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `typeof typeof globalThis;`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "typeof");
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const sample = `typeof typeof typeof typeof typeof typeof typeof typeof typeof typeof globalThis;`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 9);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "typeof");
	deepStrictEqual(sample.slice(...diagnostics[1].range), "typeof");
	deepStrictEqual(sample.slice(...diagnostics[2].range), "typeof");
	deepStrictEqual(sample.slice(...diagnostics[3].range), "typeof");
	deepStrictEqual(sample.slice(...diagnostics[4].range), "typeof");
	deepStrictEqual(sample.slice(...diagnostics[5].range), "typeof");
	deepStrictEqual(sample.slice(...diagnostics[6].range), "typeof");
	deepStrictEqual(sample.slice(...diagnostics[7].range), "typeof");
	deepStrictEqual(sample.slice(...diagnostics[8].range), "typeof");
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `typeof globalThis;`);
	deepStrictEqual(diagnostics.length, 0);
});
