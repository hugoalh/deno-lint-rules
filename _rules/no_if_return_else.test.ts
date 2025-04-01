import { assertEquals } from "STD/assert/equals";
import { data } from "./no_if_return_else.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function foo1() {
	if (x) {
		return y;
	} else {
		return z;
	}
}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function foo2() {
	if (x) {
		return y;
	} else if (z) {
		return w;
	} else {
		return t;
	}
}`);
	assertEquals(diagnostics.length, 2);
});
Deno.test("Invalid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function foo3() {
	if (x) {
		return y;
	} else {
		var t = "foo";
	}
	return t;
}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 4", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function foo4() {
	if (error) {
		return 'It failed';
	} else {
		if (loading) {
			return "It's still loading";
		}
	}
}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 5", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function foo5() {
	if (x) {
		if (y) {
			return y;
		} else {
			return x;
		}
	} else {
		return z;
	}
}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 6", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function foo6() {
	if (error) {
		return 'It failed';
	} else if (loading) {
		return "It's still loading";
	}
}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 7", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function foo7() {
	if (x) {
		return y;
	} else if (z) {
		var t = "foo";
	} else {
		return w;
	}
}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 8", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function foo1() {
	if (x) {
		throw y;
	} else {
		throw z;
	}
}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function foo1() {
	if (x) {
		return y;
	}
	return z;
}`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function foo3() {
	if (x) {
		if (z) {
			return y;
		}
	} else {
		return z;
	}
}`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("Valid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function foo3() {
	if (x) {
		if (z) {
			throw y;
		}
	} else {
		throw z;
	}
}`);
	assertEquals(diagnostics.length, 0);
});
