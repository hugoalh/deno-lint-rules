import { deepStrictEqual } from "node:assert";
import rule from "./import_at_start.ts";
import { constructPlugin } from "../_utility.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `import { foo } from "./foo.ts";
initWith(foo);
import { bar } from "./bar.ts";`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), `import { bar } from "./bar.ts";`);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `import { foo } from "./foo.ts";
import { bar } from "./bar.ts";
initWith(foo);`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `import { foo } from "./foo.ts";
import { bar } from "./bar";

import * as _ from "npm:lodash";`);
	deepStrictEqual(diagnostics.length, 0);
});
