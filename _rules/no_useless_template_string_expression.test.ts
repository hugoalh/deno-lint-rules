import { deepStrictEqual } from "node:assert";
import { constructPlugin } from "../_utility.ts";
import rule from "./no_useless_template_string_expression.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `const foo = \`a\${"b"}c\${"d"}e\`;`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 2);
	deepStrictEqual(sample.slice(...diagnostics[0].range), `\${"b"}`);
	deepStrictEqual(sample.slice(...diagnostics[1].range), `\${"d"}`);
	deepStrictEqual(diagnostics[0].fix?.[0].text, "b");
	deepStrictEqual(diagnostics[1].fix?.[0].text, "d");
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const sample = `const foo = \`a\${\`b\`}c\`;`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), `\${\`b\`}`);
	deepStrictEqual(diagnostics[0].fix?.[0].text, "b");
});
