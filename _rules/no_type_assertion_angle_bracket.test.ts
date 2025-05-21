import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_type_assertion_angle_bracket.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = <number>10;`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = 10 as number;`);
	deepStrictEqual(diagnostics.length, 0);
});
