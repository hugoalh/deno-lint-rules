import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_float_dot_start.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `const foo = .5;`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), ".5");
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const sample = `const foo = -.7;`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), ".7");
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = 0.5;`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = -0.7;`);
	deepStrictEqual(diagnostics.length, 0);
});
