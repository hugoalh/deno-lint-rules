import { deepStrictEqual } from "node:assert";
import rule from "./no_split_interface.ts";
import { constructPlugin } from "../_utility.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `interface C {
	a: boolean;
	b: string;
}
interface C {
	c: number;
	d: bigint;
}`);
	deepStrictEqual(diagnostics.length, 2);
});
