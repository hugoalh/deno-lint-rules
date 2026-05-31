import { deepStrictEqual } from "node:assert";
import rule from "./no_duplicate_set_types.ts";
import { constructPlugin } from "../_utility.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Intersection Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `type Foo = boolean & boolean & number & number & string & string & null & null;`);
	deepStrictEqual(diagnostics.length, 4);
});
Deno.test("Union Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `type Foo = boolean | boolean | number | number | string | string | null | null;`);
	deepStrictEqual(diagnostics.length, 4);
});
Deno.test("Mix Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `type Foo = boolean | boolean & boolean | number | number | string | string | null | null;`);
	deepStrictEqual(diagnostics.length, 4);
});
