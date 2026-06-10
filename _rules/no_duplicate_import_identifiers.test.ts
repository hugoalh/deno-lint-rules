import { deepStrictEqual } from "node:assert";
import { constructPlugin } from "../_utility.ts";
import rule from "./no_duplicate_import_identifiers.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `import {
	a,
	a as b,
	a as c
} from "./abc.ts";`);
	deepStrictEqual(diagnostics.length, 3);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `import a, {
	default as b,
	default as c
} from "./abc.ts";`);
	deepStrictEqual(diagnostics.length, 3);
});
