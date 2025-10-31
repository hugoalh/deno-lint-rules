import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_depend_type_json.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `import x from "data:application/json,{\\"foo\\":42}" with { type: "json" };
`);
	deepStrictEqual(diagnostics.length, 1);
});
