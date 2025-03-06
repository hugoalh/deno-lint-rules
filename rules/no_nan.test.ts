import { assertEquals } from "STD/assert/equals";
import { data } from "./no_nan.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin([{
	context: data.context(),
	identifier: data.identifier
}]);
Deno.test("Main", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const a = NaN;
const b = Number.NaN;
const c = globalThis.NaN;
const d = globalThis.Number.NaN;`);
	assertEquals(diagnostics.length, 4);
});
