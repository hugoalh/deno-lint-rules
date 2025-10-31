import { deepStrictEqual } from "node:assert";
import { ruleData } from "./curly_else.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `if (foo) {
	baz();
} else qux();`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "qux();");
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `if (foo) {
	baz();
} else {
	qux();
}`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `if (x > 50) {
	/* do something */
} else if (x > 5) {
	/* do something */
} else {
	/* do something */
}`);
	deepStrictEqual(diagnostics.length, 0);
});
