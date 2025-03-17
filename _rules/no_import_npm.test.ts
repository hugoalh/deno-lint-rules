import { assertEquals } from "STD/assert/equals";
import { data } from "./no_import_npm.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Import NamedDeclaration Protocol Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import confetti from "npm:canvas-confetti@^1.6.0";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Import NamedDeclaration URL Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import confetti from "https://esm.sh/canvas-confetti@^1.6.0";`);
	assertEquals(diagnostics.length, 1);
});
