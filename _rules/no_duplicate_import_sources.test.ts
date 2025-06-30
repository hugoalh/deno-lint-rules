import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_duplicate_import_sources.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `import { a } from "./abc.ts";
import { b } from "./abc.ts";
import { c } from "./abc.ts";`);
	deepStrictEqual(diagnostics.length, 3);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `import {
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
