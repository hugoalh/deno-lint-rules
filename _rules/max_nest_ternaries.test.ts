import { deepStrictEqual } from "node:assert";
import { ruleData } from "./max_nest_ternaries.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `const thing = foo ? bar : ((baz === qux) ? quxx : foobar);`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "(baz === qux) ? quxx : foobar");
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const sample = `foo ? ((baz === qux) ? quxx() : foobar()) : bar();`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "(baz === qux) ? quxx() : foobar()");
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const thing = foo ? bar : foobar;`);
	deepStrictEqual(diagnostics.length, 0);
});
