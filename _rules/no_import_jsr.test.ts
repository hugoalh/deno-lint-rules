import { deepStrictEqual } from "node:assert";
import { data } from "./no_import_jsr.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Import NamedDeclaration Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import { copy } from "https://jsr.io/@std/fs/1.0.14/copy.ts";`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Import NamedDeclaration Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import { copy } from "jsr:@std/fs@^1.0.14/copy";`);
	deepStrictEqual(diagnostics.length, 0);
});
