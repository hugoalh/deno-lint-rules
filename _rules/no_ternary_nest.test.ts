import { deepStrictEqual } from "node:assert";
import { data } from "./no_ternary_nest.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const thing = foo ? bar : ((baz === qux) ? quxx : foobar);`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `foo ? ((baz === qux) ? quxx() : foobar()) : bar();`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const thing = foo ? bar : foobar;`);
	deepStrictEqual(diagnostics.length, 0);
});
