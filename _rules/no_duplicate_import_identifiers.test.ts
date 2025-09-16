import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_duplicate_import_identifiers.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `import {
	a,
	a as b,
	a as c
} from "./abc.ts";`);
	deepStrictEqual(diagnostics.length, 3);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `import a, {
	default as b,
	default as c
} from "./abc.ts";`);
	deepStrictEqual(diagnostics.length, 3);
});
