import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_import_source.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `import source addModule from "./add.wasm";
const addInstance = WebAssembly.instantiate(addModule);
const add = addInstance.exports.add;
console.log(add(1, 2));`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), `import source addModule from "./add.wasm";`);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `import source from "./add.js";`);
	deepStrictEqual(diagnostics.length, 0);
});
