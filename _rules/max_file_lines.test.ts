import { deepStrictEqual } from "node:assert";
import { ruleData } from "./max_file_lines.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier({ maximum: 4 })
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
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), `4;
5;
6;
7;
8;
9;`);
	deepStrictEqual(diagnostics[0].message, `Script file too many lines; Maximum: 4, Current: 10.`);
});
