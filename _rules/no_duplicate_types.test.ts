import { assertEquals } from "STD/assert/equals";
import { data } from "./no_duplicate_types.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `type Foo = boolean | string;
type Bar = boolean | string;`);
	assertEquals(diagnostics.length, 2);
});
