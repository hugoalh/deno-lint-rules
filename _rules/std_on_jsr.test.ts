import { assertEquals } from "STD/assert/equals";
import { data } from "./std_on_jsr.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Import NamedDeclaration Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import { copy } from "https://deno.land/std@0.224.0/fs/copy.ts";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Import NamedDeclaration Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import { copy } from "jsr:@std/fs@^1.0.14/copy";`);
	assertEquals(diagnostics.length, 0);
});
