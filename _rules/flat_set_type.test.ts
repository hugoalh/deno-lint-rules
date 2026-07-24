import { deepStrictEqual } from "node:assert";
import { constructPlugin } from "../_utility.ts";
import rule from "./flat_set_type.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Intersection Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `type Foo = boolean & (number & string) & null;`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Union Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `type Foo = boolean | (number | string) | null;`);
	deepStrictEqual(diagnostics.length, 1);
});
