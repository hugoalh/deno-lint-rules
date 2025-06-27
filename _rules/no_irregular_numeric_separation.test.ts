import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_irregular_numeric_separation.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("BigInt Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = 12_34567_890n;`);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(diagnostics[0].fix?.[0].text, "1_234_567_890");
});
Deno.test("BigInt Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = 1_234_567_890n;`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("BigInt Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = 1234567890n;`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Number Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = 12_34567_890;`);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(diagnostics[0].fix?.[0].text, "1_234_567_890");
});
Deno.test("Number Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = 1_234_567_890;`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Number Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = 1234567890;`);
	deepStrictEqual(diagnostics.length, 0);
});
