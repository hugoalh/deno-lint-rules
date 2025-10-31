import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_useless_template_string.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `const foo = \`abcde\`;`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), `\`abcde\``);
	deepStrictEqual(diagnostics[0].fix?.[0]?.text, `"abcde"`);
});
