import { deepStrictEqual } from "node:assert";
import { constructPlugin } from "../_utility.ts";
import rule from "./no_depend_from_dlmr.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Import NamedDeclaration Invalid 1", { permissions: "none" }, () => {
	const sample = `import { copy } from "https://deno.land/std@0.224.0/fs/copy.ts";`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), `"https://deno.land/std@0.224.0/fs/copy.ts"`);
});
