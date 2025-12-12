import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_depend_from_absolute.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Import DefaultDeclaration DoubleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `import x from "/path/to/the/file.ts";`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Import DefaultDeclaration SingleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `import x from '/path/to/the/file.ts';`);
	deepStrictEqual(diagnostics.length, 1);
});
