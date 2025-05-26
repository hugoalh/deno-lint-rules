import { deepStrictEqual } from "node:assert";
import { ruleData } from "./std_on_jsr.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Import NamedDeclaration Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `import { copy } from "https://deno.land/std@0.224.0/fs/copy.ts";`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Import NamedDeclaration Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `import { copy } from "jsr:@std/fs@^1.0.14/copy";`);
	deepStrictEqual(diagnostics.length, 0);
});
