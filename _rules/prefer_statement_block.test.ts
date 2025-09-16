import { deepStrictEqual } from "node:assert";
import { ruleData } from "./prefer_statement_block.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("If Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `if (foo) foo++;`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("If Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `if (foo) {
	foo++;
}`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("If-Else Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `if (foo) {
	baz();
} else qux();`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("If-Else Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `if (foo) {
	baz();
} else {
	qux();
}`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("While Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `while (bar)
	baz();`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("While Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `while (bar) {
	baz();
}`);
	deepStrictEqual(diagnostics.length, 0);
});
