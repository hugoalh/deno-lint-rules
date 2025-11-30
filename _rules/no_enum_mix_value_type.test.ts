import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_enum_mix_value_type.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `enum Status {
	Unknown,
	Closed = 1,
	Open = 'open',
}`);
	deepStrictEqual(diagnostics.length, 1);
});
