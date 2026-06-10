import { deepStrictEqual } from "node:assert";
import { constructPlugin } from "../_utility.ts";
import rule from "./no_depend_from_file.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Import DefaultDeclaration DoubleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `import x from "file:///C:/path/to/the/file.ts";`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Import DefaultDeclaration SingleQuote Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `import x from 'file:///C:/path/to/the/file.ts';`);
	deepStrictEqual(diagnostics.length, 1);
});
