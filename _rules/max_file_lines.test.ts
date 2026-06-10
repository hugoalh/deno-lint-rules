import { deepStrictEqual } from "node:assert";
import { constructPlugin } from "../_utility.ts";
import rule from "./max_file_lines.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier({ maximum: 4 })
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `0;
1;
2;
3;
4;
5;
6;
7;
8;
9;`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), `4;
5;
6;
7;
8;
9;`);
	deepStrictEqual(diagnostics[0].message, `Script file have too many lines; Maximum: 4, Current: 10.`);
});
