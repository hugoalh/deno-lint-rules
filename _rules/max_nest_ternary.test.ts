import { deepStrictEqual } from "node:assert";
import { ruleData } from "./max_nest_ternary.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const thing = foo ? bar : ((baz === qux) ? quxx : foobar);`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `foo ? ((baz === qux) ? quxx() : foobar()) : bar();`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const thing = foo ? bar : foobar;`);
	deepStrictEqual(diagnostics.length, 0);
});
