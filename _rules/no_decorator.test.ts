import { deepStrictEqual } from "node:assert";
import { constructPlugin } from "../_utility.ts";
import rule from "./no_decorator.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `function first() {
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
`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 2);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "@first()");
	deepStrictEqual(sample.slice(...diagnostics[1].range), "@second()");
});
