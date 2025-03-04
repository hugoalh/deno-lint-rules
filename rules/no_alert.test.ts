import { assertEquals } from "STD/assert/equals";
import { data } from "./no_alert.ts";
import { constructDenoLintPlugin } from "../_utility.ts";
const rule = constructDenoLintPlugin([{
	context: data.context(),
	identifier: data.identifier
}]);
Deno.test("Main", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `alert();
globalThis.alert();
globalThis.window.alert();
window.alert();
`);
	assertEquals(diagnostics.length, 4);
});
