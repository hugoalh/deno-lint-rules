import { assertEquals } from "STD/assert/equals";
import { data } from "./no_duplicate_imports.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Export Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `export { a } from "./abc.ts";
export { b } from "./abc.ts";
export { c } from "./abc.ts";`);
	assertEquals(diagnostics.length, 3);
});
Deno.test("Import Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import { a } from "./abc.ts";
import { b } from "./abc.ts";
import { c } from "./abc.ts";`);
	assertEquals(diagnostics.length, 3);
});
Deno.test("Export Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `export { a, b, c } from "./abc.ts";
export { a, b, c } from "./abc.ts?debug";`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("Import Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import { a, b, c } from "./abc.ts";
import { a, b, c } from "./abc.ts?debug";`);
	assertEquals(diagnostics.length, 0);
});
