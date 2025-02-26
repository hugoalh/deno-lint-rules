import { assertEquals } from "STD/assert/equals";
import { data } from "./std_on_jsr.ts";
import { constructDenoLintPlugin } from "../_utility.ts";
const rule = constructDenoLintPlugin([{
	context: data.context(),
	identifier: data.identifier
}]);
Deno.test("Import Invalid", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import {} from "https://deno.land/std@0.200.0/fake.ts";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Import Valid", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import {} from "jsr:@std/fake";`);
	assertEquals(diagnostics.length, 0);
});
