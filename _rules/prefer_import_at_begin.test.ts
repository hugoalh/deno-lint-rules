import { deepStrictEqual } from "node:assert";
import { data } from "./prefer_import_at_begin.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import foo from "./foo.ts";
initWith(foo);
import bar from "./bar.ts";`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import foo from "./foo.ts";
import bar from "./bar.ts";
initWith(foo);`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import foo from "./foo.ts";
import bar from "./bar";

import * as _ from "npm:lodash";`);
	deepStrictEqual(diagnostics.length, 0);
});
