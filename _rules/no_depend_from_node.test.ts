import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_depend_from_node.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Import DefaultDeclaration DoubleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `import path from "node:path";`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Import DefaultDeclaration SingleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `import path from 'node:path';`);
	deepStrictEqual(diagnostics.length, 1);
});
