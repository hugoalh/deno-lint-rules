import { deepStrictEqual } from "node:assert";
import { constructPlugin } from "../_utility.ts";
import rule from "./no_duplicate_import_sources.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `import { a } from "./abc.ts";
import { b } from "./abc.ts";
import { c } from "./abc.ts";`);
	deepStrictEqual(diagnostics.length, 3);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `import {
	a,
	b,
	c
} from "./abc.ts";
import {
	a as d,
	b as e,
	c as f
} from "./abc.ts?debug";`);
	deepStrictEqual(diagnostics.length, 0);
});
