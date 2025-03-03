import { assertEquals } from "STD/assert/equals";
import { data } from "./prefer_statement_block.ts";
import { constructDenoLintPlugin } from "../_utility.ts";
const rule = constructDenoLintPlugin([{
	context: data.context(),
	identifier: data.identifier
}]);
Deno.test("Invalid", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `if (foo) foo++;

while (bar)
	baz();

if (foo) {
	baz();
} else qux();`);
	assertEquals(diagnostics.length, 3);
});
Deno.test("Valid", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `if (foo) {
	foo++;
}

while (bar) {
	baz();
}

if (foo) {
	baz();
} else {
	qux();
}`);
	assertEquals(diagnostics.length, 0);
});
