import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_deno.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `try {
	const file = await Deno.open("./some/file.txt");
} catch (error) {
	if (error instanceof Deno.errors.NotFound) {
		console.error("the file was not found");
	} else {
		// otherwise re-throw
		throw error;
	}
}`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 2);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "Deno");
	deepStrictEqual(sample.slice(...diagnostics[1].range), "Deno");
});
