import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_misuse_for.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = [1, 2, 3];
let index = 0;
for (; index < foo.length; ) {
	console.log(foo[index]);
	index += 1
}`);
	deepStrictEqual(diagnostics.length, 1);
});
