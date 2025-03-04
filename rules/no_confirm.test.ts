import { assertEquals } from "STD/assert/equals";
import { data } from "./no_confirm.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin([{
	context: data.context(),
	identifier: data.identifier
}]);
Deno.test("Main", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `confirm();
globalThis.confirm();
globalThis.window.confirm();
window.confirm();
`);
	assertEquals(diagnostics.length, 4);
});
