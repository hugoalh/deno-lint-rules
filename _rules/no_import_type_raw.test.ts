import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_import_type_raw.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `import message from "./hello.txt" with { type: "text" };
import bytes from "./hello.txt" with { type: "bytes" };
import imageBytes from "./image.png" with { type: "bytes" };
`);
	deepStrictEqual(diagnostics.length, 3);
});
