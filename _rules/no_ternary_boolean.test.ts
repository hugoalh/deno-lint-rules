import { assertEquals } from "STD/assert/equals";
import { data } from "./no_ternary_boolean.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin([{
	context: data.context(),
	identifier: data.identifier
}]);
Deno.test("Main", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `Deno ? true : false;`);
	assertEquals(diagnostics.length, 1);
});
