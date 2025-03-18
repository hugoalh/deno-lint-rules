import { assertEquals } from "STD/assert/equals";
import { data } from "./prefer_import_at_begin.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import foo from "./foo.ts";
initWith(foo);
import bar from "./bar.ts";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import foo from "./foo.ts";
import bar from "./bar.ts";
initWith(foo);`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import foo from "./foo.ts";
import bar from "./bar";

import * as _ from "npm:lodash";`);
	assertEquals(diagnostics.length, 0);
});
