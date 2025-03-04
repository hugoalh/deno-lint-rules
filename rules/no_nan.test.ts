import { assertEquals } from "STD/assert/equals";
import { data } from "./no_nan.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin([{
	context: data.context(),
	identifier: data.identifier
}]);
Deno.test("Main", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = NaN;
const bar = Number.NaN;`);
	assertEquals(diagnostics.length, 2);
});
