import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_void.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `const output = void 1;
console.log(output);
// Expected output: undefined

void console.log("expression evaluated");
// Expected output: "expression evaluated"

void (function iife() {
	console.log("iife is executed");
})();
// Expected output: "iife is executed"

void function test() {
	console.log("test function executed");
};
try {
	test();
} catch (e) {
	console.log("test function is not defined");
	// Expected output: "test function is not defined"
}
`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 4);
	deepStrictEqual(sample.slice(...diagnostics[0].range), `void 1`);
	deepStrictEqual(sample.slice(...diagnostics[1].range), `void console.log("expression evaluated")`);
	deepStrictEqual(sample.slice(...diagnostics[2].range), `void (function iife() {
	console.log("iife is executed");
})()`);
	deepStrictEqual(sample.slice(...diagnostics[3].range), `void function test() {
	console.log("test function executed");
}`);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const sample = `void function () {
	console.log("Executed!");
}();

// Logs "Executed!"
`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), `void function () {
	console.log("Executed!");
}()`);
});
