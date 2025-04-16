import { deepStrictEqual } from "node:assert";
import { data } from "./no_duplicate_imports.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Export Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `export { a } from "./abc.ts";
export { b } from "./abc.ts";
export { c } from "./abc.ts";`);
	deepStrictEqual(diagnostics.length, 3);
});
Deno.test("Import Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import { a } from "./abc.ts";
import { b } from "./abc.ts";
import { c } from "./abc.ts";`);
	deepStrictEqual(diagnostics.length, 3);
});
Deno.test("Import Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import { a as b, a as c } from "./abc.ts";`);
	deepStrictEqual(diagnostics.length, 2);
});
Deno.test("Import Invalid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import a, { default as b, default as c } from "./abc.ts";`);
	deepStrictEqual(diagnostics.length, 3);
});
Deno.test("Export Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `export { a, b, c } from "./abc.ts";
export { a, b, c } from "./abc.ts?debug";`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Import Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import { a, b, c } from "./abc.ts";
import { a, b, c } from "./abc.ts?debug";`);
	deepStrictEqual(diagnostics.length, 0);
});
