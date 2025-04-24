import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_duplicate_types.ts";
import { constructDenoLintPlugin } from "../_utility.ts";
const rule = constructDenoLintPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `type Foo = boolean | string;
type Bar = boolean | string;`);
	deepStrictEqual(diagnostics.length, 2);
});
