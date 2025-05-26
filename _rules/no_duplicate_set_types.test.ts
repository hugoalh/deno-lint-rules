import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_duplicate_set_types.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Intersection Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `type Foo = boolean & boolean & number & number & string & string & null & null;`);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(diagnostics[0].fix?.[0].text, "boolean & number & string & null");
});
Deno.test("Union Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `type Foo = boolean | boolean | number | number | string | string | null | null;`);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(diagnostics[0].fix?.[0].text, "boolean | number | string | null");
});
Deno.test("Mix Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `type Foo = boolean | boolean & boolean | number | number | string | string | null | null;`);
	deepStrictEqual(diagnostics.length, 2);
});
