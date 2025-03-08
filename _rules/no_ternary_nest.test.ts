import { assertEquals } from "STD/assert/equals";
import { data } from "./no_ternary_nest.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin([{
	context: data.context(),
	identifier: data.identifier
}]);
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const thing = foo ? bar : baz === qux ? quxx : foobar;`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `foo ? baz === qux ? quxx() : foobar() : bar();`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const thing = foo ? bar : foobar;`);
	assertEquals(diagnostics.length, 0);
});
