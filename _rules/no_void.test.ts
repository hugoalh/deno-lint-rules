import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_void.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const output = void 1;
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
`);
	deepStrictEqual(diagnostics.length, 4);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `void function () {
	console.log("Executed!");
}();

// Logs "Executed!"
`);
	deepStrictEqual(diagnostics.length, 1);
});
