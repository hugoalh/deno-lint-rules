import { deepStrictEqual } from "node:assert";
import { constructPlugin } from "../_utility.ts";
import rule from "./no_depend_from_jsr_protocol.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Import NamedDeclaration Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `import { copy } from "jsr:@std/fs@^1.0.14/copy";`);
	deepStrictEqual(diagnostics.length, 1);
});
