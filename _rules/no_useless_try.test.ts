import { deepStrictEqual } from "node:assert";
import { data } from "./no_useless_try.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `try {
	doSomethingThatMightThrow();
} catch (e) {
	throw e;
}`);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(diagnostics[0].fix?.[0].text, `doSomethingThatMightThrow();`);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `try {
	doSomethingThatMightThrow();
} catch (e) {
	throw e;
} finally {
	cleanUp();
}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `try {
	doSomethingThatMightThrow();
} catch (e) {
	doSomethingBeforeRethrow();
	throw e;
}`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `try {
	doSomethingThatMightThrow();
} catch (e) {
	handleError(e);
}`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Valid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `try {
	doSomethingThatMightThrow();
} finally {
	cleanUp();
}`);
	deepStrictEqual(diagnostics.length, 0);
});
