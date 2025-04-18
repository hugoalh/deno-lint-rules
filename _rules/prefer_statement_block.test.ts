import { deepStrictEqual } from "node:assert";
import { data } from "./prefer_statement_block.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("If Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `if (foo) foo++;`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("If Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `if (foo) {
	foo++;
}`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("If-Else Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `if (foo) {
	baz();
} else qux();`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("If-Else Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `if (foo) {
	baz();
} else {
	qux();
}`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("While Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `while (bar)
	baz();`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("While Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `while (bar) {
	baz();
}`);
	deepStrictEqual(diagnostics.length, 0);
});
