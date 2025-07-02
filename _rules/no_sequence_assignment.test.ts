import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_sequence_assignment.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const a = 1, b = 2, c = 3;`);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(diagnostics[0].fix?.[0].text, `const a = 1; const b = 2; const c = 3;`);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `let a, b, c;
a = 1, b = 2, c = 3;`);
	deepStrictEqual(diagnostics.length, 2);
	deepStrictEqual(diagnostics[0].fix?.[0].text, `let a; let b; let c;`);
	deepStrictEqual(diagnostics[0].fix?.[1].text, `a = 1; b = 2; c = 3;`);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `for (let a = 1, b = 2, c = 3; a < array.length; a++) {
	const element = array[a];
}`);
	deepStrictEqual(diagnostics.length, 0);
});
