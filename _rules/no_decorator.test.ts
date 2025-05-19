import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_decorator.ts";
import { constructDenoLintPlugin } from "../_utility.ts";
const rule = constructDenoLintPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function first() {
	console.log("first(): factory evaluated");
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		console.log("first(): called");
	};
}
 
function second() {
	console.log("second(): factory evaluated");
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		console.log("second(): called");
	};
}
 
class ExampleClass {
	@first()
	@second()
	method() {}
}
`);
	deepStrictEqual(diagnostics.length, 2);
});
