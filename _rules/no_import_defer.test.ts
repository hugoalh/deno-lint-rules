import { deepStrictEqual } from "node:assert";
import rule from "./no_import_defer.ts";
import { constructPlugin } from "../_utility.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `import defer * as addModule from "./add.wasm";`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), `import defer * as addModule from "./add.wasm";`);
});
Deno.test("Invalid 2", {
	ignore: true,// NOTE: Not support yet.
	permissions: "none"
}, () => {
	const sample = `const addModule = await import.defer("./add.wasm");`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), `import.defer("./add.wasm")`);
});
