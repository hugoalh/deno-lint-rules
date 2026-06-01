import { deepStrictEqual } from "node:assert";
import rule from "./no_class_constructor_parameter_property.ts";
import { constructPlugin } from "../_utility.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `class Params {
	constructor(public readonly x: number, protected y: number, private z: number) {
		// ...
	}
}`;
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 3);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "public readonly x: number");
	deepStrictEqual(sample.slice(...diagnostics[1].range), "protected y: number");
	deepStrictEqual(sample.slice(...diagnostics[2].range), "private z: number");
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `class Params {
	public readonly x: number;
	protected y: number;
	private z: number;
	constructor(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
		// ...
	}
}`);
	deepStrictEqual(diagnostics.length, 0);
});
