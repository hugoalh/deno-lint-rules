import { deepStrictEqual } from "node:assert";
import rule from "./no_duplicate_export_sources.ts";
import { constructPlugin } from "../_utility.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `export { a } from "./abc.ts";
export { b } from "./abc.ts";
export { c } from "./abc.ts";`);
	deepStrictEqual(diagnostics.length, 3);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `export {
	a,
	b,
	c
} from "./abc.ts";
export {
	a as d,
	b as e,
	c as f
} from "./abc.ts?debug";`);
	deepStrictEqual(diagnostics.length, 0);
});
