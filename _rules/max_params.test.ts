import { assertEquals } from "STD/assert/equals";
import { data } from "./max_params.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin([{
	context: data.context(),
	identifier: data.identifier
}]);
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function foo (a, b, c, d, e) {
	doSomething();
}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = (a, b, c, d, e) => {
	doSomething();
};`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function foo (a, b, c, d) {
	doSomething();
}`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = (a, b, c, d) => {
	doSomething();
};`);
	assertEquals(diagnostics.length, 0);
});