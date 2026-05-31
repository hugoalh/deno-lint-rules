import { deepStrictEqual } from "node:assert";
import rule from "./no_useless_template_string.ts";
import { constructPlugin } from "../_utility.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `const foo = \`abcde\`;`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), `\`abcde\``);
	deepStrictEqual(diagnostics[0].fix?.[0]?.text, `"abcde"`);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const sample = `const foo = \`\`;`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), `\`\``);
	deepStrictEqual(diagnostics[0].fix?.[0]?.text, `""`);
});
