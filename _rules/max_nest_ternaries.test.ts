import { deepStrictEqual } from "node:assert";
import { constructPlugin } from "../_utility.ts";
import rule from "./max_nest_ternaries.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `const thing = foo ? bar : ((baz === qux) ? quxx : foobar);`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "(baz === qux) ? quxx : foobar");
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const sample = `foo ? ((baz === qux) ? quxx() : foobar()) : bar();`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "(baz === qux) ? quxx() : foobar()");
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `const thing = foo ? bar : foobar;`);
	deepStrictEqual(diagnostics.length, 0);
});
