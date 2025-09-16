import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_import_dynamic.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const x = await import("https://example.com/x.ts");`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `import x from "https://example.com/x.ts";`);
	deepStrictEqual(diagnostics.length, 0);
});
