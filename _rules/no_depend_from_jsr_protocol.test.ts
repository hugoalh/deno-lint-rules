import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_depend_from_jsr_protocol.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Import NamedDeclaration Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `import { copy } from "jsr:@std/fs@^1.0.14/copy";`);
	deepStrictEqual(diagnostics.length, 1);
});
