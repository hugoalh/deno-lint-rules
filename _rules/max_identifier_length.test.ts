import { deepStrictEqual } from "node:assert";
import { ruleData } from "./max_identifier_length.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const doooooooooooooooooooooooooooooooooooooogName = "Betty";`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const dogName = "Betty";`);
	deepStrictEqual(diagnostics.length, 0);
});
