import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_useless_catch.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `try {
	doSomethingThatMightThrow();
} catch (e) {
	throw e;
}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `try {
	doSomethingThatMightThrow();
} catch (e) {
	throw e;
} finally {
	cleanUp();
}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `try {
	doSomethingThatMightThrow();
} catch (e) {
	doSomethingBeforeRethrow();
	throw e;
}`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `try {
	doSomethingThatMightThrow();
} catch (e) {
	handleError(e);
}`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Valid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `try {
	doSomethingThatMightThrow();
} finally {
	cleanUp();
}`);
	deepStrictEqual(diagnostics.length, 0);
});
