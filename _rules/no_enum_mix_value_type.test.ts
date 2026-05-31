import { deepStrictEqual } from "node:assert";
import rule from "./no_enum_mix_value_type.ts";
import { constructPlugin } from "../_utility.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `enum Status {
	Unknown,
	Closed = 1,
	Open = 'open',
}`);
	deepStrictEqual(diagnostics.length, 1);
});
