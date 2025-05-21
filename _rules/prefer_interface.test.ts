import { deepStrictEqual } from "node:assert";
import { ruleData } from "./prefer_interface.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `type T = { x: number };`);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(diagnostics[0].fix?.[0].text, `interface T { x: number }`);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `interface T {
	x: number;
}`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `type Foo = string | {};`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Valid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `type T = string;`);
	deepStrictEqual(diagnostics.length, 0);
});
