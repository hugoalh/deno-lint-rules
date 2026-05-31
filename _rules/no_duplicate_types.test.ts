import { deepStrictEqual } from "node:assert";
import rule from "./no_duplicate_types.ts";
import { constructPlugin } from "../_utility.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `type Foo = boolean | string;
type Bar = boolean | string;`);
	deepStrictEqual(diagnostics.length, 2);
});
