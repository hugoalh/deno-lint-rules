import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_duplicate_type_contexts.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `type Foo = boolean | string;
type Bar = boolean | string;`);
	deepStrictEqual(diagnostics.length, 2);
});
