import { assertEquals } from "STD/assert/equals";
import { data } from "./std_on_jsr.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin([{
	context: data.context(),
	identifier: data.identifier
}]);
Deno.test("Import Declaration Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import {} from "https://deno.land/std@0.200.0/fake.ts";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Import Declaration Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import {} from "jsr:@std/fake@^1.0.0";`);
	assertEquals(diagnostics.length, 0);
});
