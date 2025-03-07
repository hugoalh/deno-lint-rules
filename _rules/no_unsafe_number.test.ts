import { assertEquals } from "STD/assert/equals";
import { data } from "./no_unsafe_number.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin([{
	context: data.context(),
	identifier: data.identifier
}]);
Deno.test("Main", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = 98765432109876543210;
const bar = 98765432109876543.2109;`);
	assertEquals(diagnostics.length, 2);
});
