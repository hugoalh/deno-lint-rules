import { deepStrictEqual } from "node:assert";
import rule from "./no_depend_type_bytes.ts";
import { constructPlugin } from "../_utility.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `import bytes from "./hello.txt" with { type: "bytes" };
import imageBytes from "./image.png" with { type: "bytes" };
`);
	deepStrictEqual(diagnostics.length, 2);
});
