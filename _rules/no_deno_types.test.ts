import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_deno_types.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `// @deno-types="./coolLib.d.ts"
import * as coolLib from "./coolLib.js";`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), `@deno-types`);
});
