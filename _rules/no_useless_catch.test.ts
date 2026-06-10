import { deepStrictEqual } from "node:assert";
import { constructPlugin } from "../_utility.ts";
import rule from "./no_useless_catch.ts";
const plugin = constructPlugin({
	[rule.identifier]: rule.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `try {
	doSomethingThatMightThrow();
} catch (e) {
	throw e;
}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `try {
	doSomethingThatMightThrow();
} catch (e) {
	throw e;
} finally {
	cleanUp();
}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `try {
	doSomethingThatMightThrow();
} catch (e) {
	doSomethingBeforeRethrow();
	throw e;
}`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `try {
	doSomethingThatMightThrow();
} catch (e) {
	handleError(e);
}`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Valid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(plugin, "foo.ts", `try {
	doSomethingThatMightThrow();
} finally {
	cleanUp();
}`);
	deepStrictEqual(diagnostics.length, 0);
});
