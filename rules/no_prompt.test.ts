import { assertEquals } from "STD/assert/equals";
import { data } from "./no_prompt.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin([{
	context: data.context(),
	identifier: data.identifier
}]);
Deno.test("Main", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `prompt();
globalThis.prompt();
globalThis.window.prompt();
window.prompt();
`);
	assertEquals(diagnostics.length, 4);
});
