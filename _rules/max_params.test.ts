import { deepStrictEqual } from "node:assert";
import { ruleData } from "./max_params.ts";
import {
	constructPlugin,
	getContextPositionForDiagnostics
} from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `function foo (a, b, c, d, e) {
	doSomething();
}`;
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	const positions = getContextPositionForDiagnostics(sample, diagnostics);
	deepStrictEqual(positions[0], [1, 1, 3, 2]);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const sample = `const foo = (a, b, c, d, e) => {
	doSomething();
};`;
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	const positions = getContextPositionForDiagnostics(sample, diagnostics);
	deepStrictEqual(positions[0], [1, 13, 3, 2]);
});
Deno.test("Invalid 3", { permissions: "none" }, () => {
	const sample = `class Foo {
	constructor(a, b, c, d, e) {
		doSomething();
	}
}`;
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	const positions = getContextPositionForDiagnostics(sample, diagnostics);
	deepStrictEqual(positions[0], [2, 2, 4, 3]);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function foo (a, b, c, d) {
	doSomething();
}`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = (a, b, c, d) => {
	doSomething();
};`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Valid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `class Foo {
	constructor(a, b, c, d) {
		doSomething();
	}
}`);
	deepStrictEqual(diagnostics.length, 0);
});
