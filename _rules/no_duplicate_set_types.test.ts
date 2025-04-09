import { deepStrictEqual } from "node:assert";
import { data } from "./no_duplicate_set_types.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Intersection Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `type Foo = boolean & boolean & number & number & string & string & null & null;`);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(diagnostics[0].fix?.[0].text, "boolean & number & string & null");
});
Deno.test("Union Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `type Foo = boolean | boolean | number | number | string | string | null | null;`);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(diagnostics[0].fix?.[0].text, "boolean | number | string | null");
});
Deno.test("Mix Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `type Foo = boolean | boolean & boolean | number | number | string | string | null | null;`);
	deepStrictEqual(diagnostics.length, 2);
});
