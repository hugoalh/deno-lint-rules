import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_split_interface.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `interface C {
	a: boolean;
	b: string;
}
interface C {
	c: number;
	d: bigint;
}`);
	deepStrictEqual(diagnostics.length, 2);
});
