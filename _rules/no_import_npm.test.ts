import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_import_npm.ts";
import { constructDenoLintPlugin } from "../_utility.ts";
const rule = constructDenoLintPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Import NamedDeclaration Protocol Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import confetti from "npm:canvas-confetti@^1.6.0";`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Import NamedDeclaration URL Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import confetti from "https://esm.sh/canvas-confetti@^1.6.0";`);
	deepStrictEqual(diagnostics.length, 1);
});
