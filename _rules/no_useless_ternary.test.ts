import { assertEquals } from "STD/assert/equals";
import { data } from "./no_useless_ternary.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin([{
	context: data.context(),
	identifier: data.identifier
}]);
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const isYes = (answer === 1) ? true : false;`);
	assertEquals(diagnostics.length, 1);
	assertEquals(diagnostics[0].fix?.[0].text, "answer === 1");
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const isNo = (answer === 1) ? false : true;`);
	assertEquals(diagnostics.length, 1);
	assertEquals(diagnostics[0].fix?.[0].text, "!(answer === 1)");
});
Deno.test("Invalid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const a = (x === 2) ? true : false;`);
	assertEquals(diagnostics.length, 1);
	assertEquals(diagnostics[0].fix?.[0].text, "x === 2");
});
Deno.test("Invalid 4", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const b = x ? true : false;`);
	assertEquals(diagnostics.length, 1);
	assertEquals(diagnostics[0].fix?.[0].text, "Boolean(x)");
});
