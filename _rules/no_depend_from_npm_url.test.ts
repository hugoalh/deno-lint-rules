import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_depend_from_npm_url.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Import DefaultDeclaration Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `import chalk from "https://esm.sh/chalk@^5.6.2";`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Import DefaultDeclaration Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `import chalk from "npm:chalk@^5.6.2";`);
	deepStrictEqual(diagnostics.length, 0);
});
