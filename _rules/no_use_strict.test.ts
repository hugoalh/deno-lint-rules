import { assertEquals } from "STD/assert/equals";
import { data } from "./no_use_strict.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin([{
	context: data.context(),
	identifier: data.identifier
}]);
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `"use strict";

// strict mode

function foo() {
	// strict mode
}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function foo() {
	"use strict";
	// strict mode
}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `(function() {
	"use strict";
	function bar() {
		// strict mode
	}
}());`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Valid", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = "use strict";`);
	assertEquals(diagnostics.length, 0);
});
