import { deepStrictEqual } from "node:assert";
import rule from "./no_depend_type_json.ts";
import { constructPlugin } from "../_utility.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `import x from "data:application/json,{\\"foo\\":42}" with { type: "json" };
`);
	deepStrictEqual(diagnostics.length, 1);
});
