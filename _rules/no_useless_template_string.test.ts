import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_useless_template_string.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = \`abcde\`;`);
	deepStrictEqual(diagnostics.length, 1);
});
